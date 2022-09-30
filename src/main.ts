import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('API OCCRI')
    .setDescription('API to manage OCCRI System')
    .setVersion('0.0.1')
    .addBearerAuth({
      description: 'Please enter token in following format: Bearer <JWT>',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useStaticAssets('./public');
  app.setBaseViewsDir('./views');
  hbs.registerPartials(__dirname + '/views/partials');
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'main' });

  await app.listen(process.env.PORT || 80);
}
bootstrap();
