import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SeacherModule} from './Modules/SearcherModule/Seacher.module'
async function bootstrap() {
  const app = await NestFactory.create(SeacherModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
