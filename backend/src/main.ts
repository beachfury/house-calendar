import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) Prefix all routes with /api
  app.setGlobalPrefix('api');

  // 2) Enable global validation:
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,                // strip any properties not in the DTO
    forbidNonWhitelisted: true,     // throw an error if unknown props are sent
    transform: true,                // auto-transform payloads to DTO instances/types
  }));

  await app.listen(3001);
  console.log(' Server running on http://localhost:3001/api');
}
bootstrap();
