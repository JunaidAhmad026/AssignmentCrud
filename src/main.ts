import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { Environment, EnvironmentVariables } from './env.validation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.use(cookieParser());
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.enableCors();

  // Set up express-hbs engine
  app.useStaticAssets(join(__dirname, '../', 'public'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('hbs');
  // Set up logger

  // Set up config-service
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  const environment =
    configService.get<Environment>('NODE_ENV') ?? Environment.Dev;

  const apiPrefix = configService.get<string>('API_PREFIX') ?? 'api';

  app.setGlobalPrefix(apiPrefix);

  // Set up API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: `v`,
  });

  // Set up validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Set up swagger-docs
  const config = new DocumentBuilder()
    .setTitle(`Hotel Management System`)
    .setDescription(`The HMS API documentation`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  // Start the server
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(3030);

  console.log('💻 Application Started');
}
bootstrap();
