import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

type ResponseBody = {
  statusCode: number;
  timestamp: string;
  method: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggingService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody: ResponseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      response: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.response = exception.getResponse();
    }

    response.status(responseBody.statusCode).json(responseBody);

    const errorMessage = this.generateErrorMessage(request, responseBody);

    if (responseBody.statusCode < 500) {
      this.logger.warn(errorMessage, HttpExceptionFilter.name);
    } else {
      this.logger.error(errorMessage, HttpExceptionFilter.name);
    }
  }

  private generateErrorMessage(
    { url, method }: Request,
    { statusCode, response }: ResponseBody,
  ) {
    return `{url: ${url}, method: ${method}, status: ${statusCode}} responnse: ${JSON.stringify(
      response,
    )}`;
  }
}

// @Catch(HttpException)
// export class CustomExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();

//     const responseBody = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.message,
//     };

//     response.status(status).json(responseBody);
//   }
// }

// @Catch()
// export class CustomExceptionFilter extends BaseExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     if (exception instanceof HttpException) {
//       // If the exception is an HttpException, extract its properties
//       const status = exception.getStatus();
//       response.status(status).json({
//         statusCode: status,
//         message: exception.message,
//       });
//     } else {
//       // If the exception is not an HttpException, respond with 500 Internal Server Error
//       response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Internal Server Error',
//       });
//     }
//     super.catch(exception, host);
//   }
// }

// @Catch()
// export class CustomExceptionFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

//   catch(exception: unknown, host: ArgumentsHost): void {
//     // In certain situations `httpAdapter` might not be available in the
//     // constructor method, thus we should resolve it here.
//     const { httpAdapter } = this.httpAdapterHost;

//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     const httpStatus =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const httpReponse =
//       exception instanceof HttpException
//         ? exception.getResponse()
//         : 'Internal Server Error';

//     const responseBody = {
//       statusCode: httpStatus,
//       timestamp: new Date().toISOString(),
//       method: request.method,
//       path: httpAdapter.getRequestUrl(ctx.getRequest()),
//       response: httpReponse,
//     };

//     httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//   }
// }
