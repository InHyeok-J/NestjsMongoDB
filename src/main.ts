import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const port = configService.get('port');

    await app.listen(port, () => {
        const Logger = new ConsoleLogger();
        Logger.log(`${port}으로 서버 시작`);
    });
}
bootstrap();
