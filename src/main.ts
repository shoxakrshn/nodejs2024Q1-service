import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { LoggingService } from './logging/logging.service';

const readApiYaml = async () => {
  const dstPath = resolve(__dirname, '..', 'doc', 'api.yaml');
  return await readFile(dstPath, 'utf-8');
};

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  logger.setupGlobalErrorListeners();

  // Uncomment bellow setTimeout to check "uncaughtException"
  // setTimeout(() => {
  //   throw new Error('Error on module');
  //   // new Promise((_, reject) => reject('Promise rejected'))
  // }, 1000);

  // Uncomment bellow setTimeout to check "unhandledRejection"
  // setTimeout(() => {
  //   new Promise((_, reject) => reject('Promise rejected'))
  // }, 1000);

  const apiConfig = await readApiYaml();
  const document = load(apiConfig) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, document);

  // app.useGlobalFilters(new HttpExceptionFilter());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  await app.listen(PORT);
}
bootstrap();
