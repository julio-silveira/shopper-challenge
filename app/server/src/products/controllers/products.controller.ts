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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductPriceDto } from '../dto/update-product-price.dto';
import { ProductEntity } from '../entities/product.entity';
import { UpdatePriceEntity } from '../entities/update-price.entity';
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
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiCreatedResponse({
    description: 'Produto cadastrado com sucesso',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiBadRequestResponse({ description: 'Produto já cadastrado' })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.findOne(createProductDto.code);

    if (product) {
      throw new BadRequestException('Produto já cadastrado');
    }

    const message = await this.productsService.create(createProductDto);

    return message;
  }

  @Get()
  @ApiOperation({ summary: 'Encontra e retorna todos produtos cadastrados.' })
  @ApiOkResponse({
    description: 'Retorna todos os produtos cadastrados',
    type: [ProductEntity],
  })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':code')
  @ApiParam({ name: 'code', type: String })
  @ApiOperation({ summary: 'Encontra um produto com base no código.' })
  @ApiOkResponse({
    description: 'Retorna o produto com base no código fornecido',
    type: ProductEntity,
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  async findOne(@Param('code') code: string) {
    const product = await this.productsService.findOne(+code);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  @Put('/prices')
  @ApiOperation({ summary: 'Atualiza os preços de um ou mais produtos' })
  @ApiOkResponse({ description: 'Preços atualizados com sucesso' })
  @ApiBadRequestResponse({ description: 'Produto inválido fornecido' })
  @ApiBody({ type: UpdateProductPriceDto })
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
  @ApiOperation({
    summary: 'Valida um arquivo CSV de produtos e retorna a validação',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'csv', format: 'binary' } },
    },
  })
  @ApiOkResponse({ type: [UpdatePriceEntity] })
  @ApiBadRequestResponse({ description: 'Arquivo inválido' })
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
