import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

const enum eLogLevel {
  VERBOSE = 0,
  DEBUG = 1,
  WARN = 2,
  LOG = 3,
  ERROR = 4,
  FATAL = 5,
}
const enum eLogName {
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  LOG = 'LOG',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logLevel: eLogLevel = +process.env.LOG_LEVEL || eLogLevel.FATAL;
  private maxSizeInBytes: number = +process.env.FILE_MAX_SIZE || 10240;
  private maxNumberFiles: number = +process.env.FILE_MAX_NUMBER || 10;

  log(message: any, context?: string) {
    if (this.logLevel >= eLogLevel.LOG) {
      this.logToFile(eLogName.LOG, message, context);
      super.log(message, context);
    }
  }

  warn(message: any, context?: string) {
    if (this.logLevel >= eLogLevel.WARN) {
      this.logToFile(eLogName.WARN, message, context);
      super.warn(message, context);
    }
  }

  fatal(message: any, context?: string) {
    if (this.logLevel >= eLogLevel.FATAL) {
      super.fatal(message, context);
    }
  }

  error(message: any, stackOrContext?: string) {
    if (this.logLevel >= eLogLevel.ERROR) {
      this.logToFile(eLogName.ERROR, message, stackOrContext);
      super.error(message, stackOrContext);
    }
  }

  debug(message: any, context?: string) {
    if (this.logLevel >= eLogLevel.DEBUG) {
      this.logToFile(eLogName.DEBUG, message, context);
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    if (this.logLevel >= eLogLevel.VERBOSE) {
      this.logToFile(eLogName.VERBOSE, message, context);
      super.verbose(message, context);
    }
  }

  private async logToFile(logType: eLogName, message: any, context?: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())}\t${logType}\t[${context}]\t${message}\n`;

    try {
      const dstDirPath =
        logType === eLogName.ERROR
          ? path.join(__dirname, '..', '..', 'logs', 'errors')
          : path.join(__dirname, '..', '..', 'logs');

      const logFilename = logType === eLogName.ERROR ? 'errorFile' : 'logFile';
      const dstFilePath = path.join(dstDirPath, `${logFilename}.log`);

      await fsPromises.mkdir(dstDirPath, { recursive: true });
      await fsPromises.appendFile(dstFilePath, formattedEntry);

      const fileStat = await fsPromises.stat(dstFilePath);

      if (fileStat.size >= this.maxSizeInBytes) {
        const renamedFilePath = path.join(
          dstDirPath,
          `${logFilename}_${Date.now()}.log`,
        );

        await fsPromises.copyFile(dstFilePath, renamedFilePath);
        await fsPromises.writeFile(dstFilePath, '');
      }

      const readdir = await fsPromises.readdir(dstDirPath);
      const fileStats = await Promise.all(
        readdir.map(async (item) => {
          const pathname = path.join(dstDirPath, item);
          const stat = await fsPromises.stat(pathname);
          return stat.isFile() ? pathname : null;
        }),
      );

      const listOfFiles = fileStats.filter(Boolean);

      if (listOfFiles.length > this.maxNumberFiles) {
        const indexToRemove = listOfFiles.length - this.maxNumberFiles;
        const fileNamestoRemove = listOfFiles.slice(0, indexToRemove);

        await Promise.all(
          fileNamestoRemove.map((filepath) => fsPromises.rm(filepath)),
        );

        await fsPromises.appendFile(dstFilePath, '');
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      } else {
        this.error(error.message);
      }
    }
  }
}
