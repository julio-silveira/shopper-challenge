import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Shopper Api')
    .setDescription('Api for shopper app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('server', app, document);

  app.enableCors();

  await app.listen(PORT, () =>
    Logger.log(`Server running on port ${PORT}`, 'Bootstrap'),
  );
}
bootstrap();
