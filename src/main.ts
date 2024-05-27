import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from '@/exceptions';
import { SwaggerService } from '@/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app
    //   .useGlobalPipes(
    //     new ValidationPipe({
    //       whitelist: true,
    //     }),
    //  )
    // .enableVersioning({
    //   type: VersioningType.URI,
    //   defaultVersion: [],
    // })
    .setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, access_token, refresh_token',
    exposedHeaders: 'Content-Type, Accept, access_token, refresh_token',
  });

  SwaggerService.setup(app);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}
bootstrap();
