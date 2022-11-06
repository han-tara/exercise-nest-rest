import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  //Open Api Specification
  const config = new DocumentBuilder()
    .setTitle('Api Specification')
    .setDescription('All kind of endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  //hbs mvc
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname,'..','views'))
  app.setViewEngine('hbs')

  //cookie parser
  app.use(cookieParser('secretIngredientsIsLove'))
  await app.listen(3000);
}
bootstrap();
