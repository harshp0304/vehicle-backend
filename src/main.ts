import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as environment from './environment/environment';
import { DB_CONFIG } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // app.use('/assets', express.static(path.join(process.cwd(), 'backend', 'assets')));

  const port = environment.DB_CONFIG.PORT;
  //CORS
  const corsOptions: CorsOptions = {
    origin: '*', // Replace with the actual origin(s) of your frontend app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description for my app')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('example') // Optional: General tags for the whole API
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 Application ENV: ${DB_CONFIG.DATABASE_CONFIG.database}`);
}
bootstrap();
