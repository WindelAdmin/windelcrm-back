import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule as AppCore } from '@src/App.module'
import * as moment from 'moment-timezone'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppCore)
  moment.tz.setDefault('America/Sao_Paulo')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Windel CRM Back-End - Documentação da API')
    .setDescription('Bem-vindo à documentação da API do Windel CRM Back-End')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.enableCors()
  await app.listen(process.env.PORT)
}

bootstrap()
