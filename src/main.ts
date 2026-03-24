import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import chalk from 'chalk';

const logger = new Logger('Server logger');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() =>
    process.env.NODE_ENV === 'production'
      ? logger.log(
          `App run on port: [${process.env.PORT}] and [${process.env.NODE_ENV}] mode]`,
        )
      : console.log(
          chalk.bgCyan.bold.red(
            `=> App run on port: [${process.env.PORT}] and [${process.env.NODE_ENV}] mode `,
          ),
        ),
  )
  .catch((error) => console.log(error));
