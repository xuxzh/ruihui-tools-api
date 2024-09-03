import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseFilter, ResponseFormatInterceptor } from '@core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: true, credentials: true },
  });

  const httpAdapter = app.get(HttpAdapterHost);
  const responseFilter = new ResponseFilter(httpAdapter);

  app.useGlobalFilters(responseFilter);

  const validationOption: ValidationPipeOptions = {
    disableErrorMessages: false,
  };

  app.useGlobalPipes(new ValidationPipe(validationOption));

  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  const config = new DocumentBuilder()
    .setTitle('RuiHui Tools API')
    .setDescription('The RuiHui Tools API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
