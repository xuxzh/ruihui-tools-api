import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // const response = context.switchToHttp().getResponse();
    // const statusCode = response.statusCode;
    return next.handle().pipe(
      tap((data) => {
        console.log(data);
      }),
      map((data) => {
        // 暂时不做处理
        return data;
      }),
    );
  }
}
