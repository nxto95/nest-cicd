import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/*
using this approach needs to inject:[ConfigService] at typeormModule forRootAsync
*/
export default (config: ConfigService): TypeOrmModuleOptions => {
  const isDev = config.getOrThrow<string>('NODE_ENV') === 'development';
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: config.getOrThrow<number>('POSTGRES_PORT'),
    username: config.getOrThrow<string>('POSTGRES_USER'),
    password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: config.getOrThrow<string>('POSTGRES_DB'),
    autoLoadEntities: true,
    synchronize: isDev,
    logging: isDev,
  };
};

/*
using this approach don`t need to inject:[ConfigService] at typeormModule forRootAsync
*/
// export default (): TypeOrmModuleOptions => {
//   const isDev = process.env.NODE_ENV === 'development';
//   return {
//     type: 'postgres',
//     host: process.env.POSTGRES_HOST || 'localhost',
//     port: Number(process.env.POSTGRES_PORT) || 5432,
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     autoLoadEntities: true,
//     synchronize: isDev,
//     logging: isDev,
//   };
// };
