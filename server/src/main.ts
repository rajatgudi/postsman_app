import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Apply a global validation pipe to automatically validate incoming requests.
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(8000);
}
// Bootstrap the application and log a message when the server starts.
bootstrap().then(() => console.log('Server started on port 8000'));
