import { NestFactory } from '@nestjs/core';
import { SheetModule } from './modules/sheet.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(SheetModule);
  await app.listen(3000);
}
bootstrap();
