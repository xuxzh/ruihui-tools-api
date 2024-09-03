import { IRhResponse } from '@model';
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

type ErrorResponseType = {
  message?: string[];
  statusCode?: number;
  error?: string;
};

export class ResponseFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const errors: any[] = (exception as Record<string, any>)?.['errors'];
    let errorMessage: string[] = [];
    if (Array.isArray(errors)) {
      errorMessage = errors.map((ele) => {
        return `【${ele.property}: ${Object.values(ele?.constraints)}】`;
      });
    }

    const httpStatus = 200;
    const errResponse: ErrorResponseType =
      exception instanceof HttpException
        ? (exception.getResponse() as ErrorResponseType)
        : ({ message: [] } as ErrorResponseType);

    const responseBody = this.responseHandler(errResponse, errorMessage);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  /** 返回标准的响应对象 */
  private responseHandler(
    origin: ErrorResponseType,
    errorMessage?: string[],
  ): IRhResponse {
    console.log('origin', origin);
    const result = {} as IRhResponse;
    result.message = Array.isArray(origin.message)
      ? origin.message.toString()
      : origin.message || errorMessage?.toString() || '';
    result.success = false;
    return result;
  }
}
