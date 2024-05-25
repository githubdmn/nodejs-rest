import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { components } from './components';
import { paths } from './paths';

export class SwaggerService {
  static setup(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('TODO API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('API')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    document.components = components;
    document.paths = paths;

    SwaggerModule.setup('api', app, document);
  }
}
