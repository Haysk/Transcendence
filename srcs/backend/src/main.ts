import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

const fs = require('fs');
const keyFile  = fs.readFileSync(__dirname + '/../api.key');
const certFile = fs.readFileSync(__dirname + '/../api.pem');
async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  httpsOptions: {
    key: keyFile,
    cert: certFile,
  }, cors: true});
  await app.listen(3000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
}
bootstrap();
