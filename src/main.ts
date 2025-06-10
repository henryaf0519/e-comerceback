import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Bootstraps the Nest application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Esto es muy importante para la seguridad
      forbidNonWhitelisted: true, // Opcional: prohíbe propiedades no definidas en el DTO
      transform: true, // Transforma los payloads a instancias del DTO
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(
    `🚀 La aplicación NestJS está lista y escuchando en http://localhost:${port}`,
  );
}
bootstrap();
