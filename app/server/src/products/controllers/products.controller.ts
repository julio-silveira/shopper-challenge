import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PacksService } from '../services/packs.service';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly packsService: PacksService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.findOne(createProductDto.code);

    if (product) {
      throw new BadRequestException('Produto já cadastrado');
    }

    const newProduct = await this.productsService.create(createProductDto);

    return newProduct;
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') code: string) {
    const product = await this.productsService.findOne(+code);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Patch()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/tmp',
      }),
    }),
  )
  async validateProductCsv(@UploadedFile() file: Express.Multer.File) {
    const parsedCsvFile = await this.productsService.parseProductCsv(file.path);

    if (!parsedCsvFile) {
      throw new BadRequestException('Arquivo inválido');
    }

    const validatedProducts = Promise.all(
      parsedCsvFile.map(async ({ code, newPrice }) => {
        const product = await this.productsService.validateProduct(
          code,
          newPrice,
        );

        const pack = await this.packsService.findOne(code);
        if (pack) {
          try {
            await this.packsService.validatePackItens(pack, parsedCsvFile);
          } catch (err) {
            product.message
              ? product.message.push(err.message)
              : (product.message = err.message);
          }
        }
        return product;
      }),
    );
    return validatedProducts;
  }
}
