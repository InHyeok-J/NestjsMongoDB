import { Injectable } from '@nestjs/common';
import configuration from './config/configuration';

@Injectable()
export class AppService {
    getHello(): string {
        console.log(configuration());
        console.log(process.env.JWT_SECRET);
        return 'Hello World!';
    }
}
