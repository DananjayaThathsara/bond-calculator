import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow React frontend at localhost:5173 to access the API
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });

  // apply global validation pipes (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger/OpenAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bond Yield Calculator API')
    .setDescription('API for calculating bond yields')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // always start on port 3000 as requested
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Bond Calculator API running on port ${port}`);
}
bootstrap();
