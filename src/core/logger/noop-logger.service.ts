import { Injectable, Logger } from '@nestjs/common';
import morgan from 'morgan';
import { Request, Response } from 'express';

@Injectable()
export class NoOpLogger extends Logger {
  get morganOption(): morgan.Options<Request, Response> {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      skip: (req: Request, res: Response) => {
        return true;
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(message: string, trace: string, context?: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(message: any, context?: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: any, context?: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: string, context?: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verbose(message: string, context?: string) {}
}
