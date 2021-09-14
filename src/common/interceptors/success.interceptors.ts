import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('before...');
        //before는 거의 미들웨어가 처리해줌.
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data,
            })),
        );
    }
}
