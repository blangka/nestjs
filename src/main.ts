import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';
import { TransformInterceptor } from './interceptor/TransformInterceptor';
import { HttpExceptionFilter } from './filter/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  // Response interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  // exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
