import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductPriceDto } from '../dto/update-product-price.dto';
import { PacksService } from '../services/packs.service';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly packsService: PacksService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso',
  })
  // @ApiParam({ schema: CreateProductDto })
  @ApiResponse({ status: 400, description: 'Produto já cadastrado' })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.findOne(createProductDto.code);

    if (product) {
      throw new BadRequestException('Produto já cadastrado');
    }

    const message = await this.productsService.create(createProductDto);

    return message;
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

  @Put('/prices')
  async updatePrices(@Body() updateProductDto: UpdateProductPriceDto) {
    const message = await this.productsService.updatePrices(
      updateProductDto.products,
    );
    if (!message) throw new BadRequestException('Produto inválido fornecido');
    return message;
  }

  @Post('/validate')
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

    const validatedProducts = await Promise.all(
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
              : (product.message = [err.message]);
            product.valid = false;
          }
        }
        return product;
      }),
    );

    return validatedProducts;
  }
}
