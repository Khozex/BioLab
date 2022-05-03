import {Module} from '@nestjs/common';
import { DatabaseModule } from 'Database/database.module';
import {SeacherService} from './Seacher.service';
import {SeacherController} from './Seacher.controller';
import {SeacherProviders} from './Seacher.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SeacherController],
    providers: [SeacherService, ...SeacherProviders],
})
export class SeacherModule {}