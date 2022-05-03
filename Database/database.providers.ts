import {Module} from '@nestjs/common';
import { databaseProviders } from './database.module';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}