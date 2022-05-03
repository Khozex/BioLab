import {Connection} from 'typeorm';
import {Seacher} from './Seacher.entity';

export const seacherProviders = [
    {
        provide: "SEACHER_REPOSITORY",
        useFactory: async(connection: Connection ) => {
            return connection.getRepository(Seacher);
        },
        inject: ['DATABASE_CONNECTION'],
    },
];