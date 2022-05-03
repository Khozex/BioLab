import {Connection} from 'typeorm';
import {Seacher} from './Seacher.entity';

export const SeacherProviders = [
    {
        provide: "SEACHER_REPOSITORY",
        useFactory: async(connection: Connection ) => {
            return connection.getRepository(Seacher);
        },
        inject: ['DATABASE_CONNECTION'],
    },
];