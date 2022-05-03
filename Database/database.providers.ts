import { createConnection } from 'typeorm';


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      name: 'Db',
      type: 'postgres',
      host: 'ec2-3-209-124-113.compute-1.amazonaws.com',
      port: 5432,
      username: 'tmwumtyirlzzyl',
      password: 'c18f49a3eab2a012fe261d05d07450270e16cc1ee5c661202a38d916d08d2802',
      database: 'dbi7rcetvj7v1p',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      extra: {
        "ssl": {
          "rejectUnauthorized": false
        }
      }
    }),
  },
];