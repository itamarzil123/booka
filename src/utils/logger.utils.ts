/**
 * Logger
 *
 * The logger for this project.
 * Currently a logger is only responsible for console.logs
 * In the future a 3rd part logging library might be used.
 */

import { Logger, OFF } from '../config/logger.config';

export enum LogTypes {
  API,
  State,
  Generic
}

interface ILogger {
  info(logType: LogTypes, field: string, more: any): any;
  warn(logType: LogTypes, warning: string): any;
  error(logType: LogTypes, err: any, field?: string): any;
  success(logType: LogTypes, operation: string): any;
  log(logType: LogTypes, logMsg: any): any;
  [propName: string]: any;
}

const validateLoggerState = (logType: LogTypes) => {
  if (
    Logger.MOD === OFF ||
    (logType === LogTypes.API && Logger.OPTIONS.API === OFF) ||
    (logType === LogTypes.State && Logger.OPTIONS.STATE === OFF)
  ) {
    return false;
  }
  return true;
};
export const logger: ILogger = {
  info: (logType: LogTypes, field: string, more: any): void => {
    if (!validateLoggerState(logType)) {
      return;
    }
    console.log('\x1b[32m%s\x1b[0m', '< ' + field + '...>', more);
  },
  warn: (logType: LogTypes, warning: string): void => {
    if (!validateLoggerState(logType)) {
      return;
    }
    console.log('\x1b[35m%s\x1b[0m', '< ' + warning + '...>');
  },
  error: (logType: LogTypes, err: any, field?: string): void => {
    if (!validateLoggerState(logType)) {
      return;
    }
    console.error(err);
    if (field) {
      console.log(
        '\x1b[41m%s\x1b[0m',
        'There has been an error while doing ' + field
      );
    } else if (!field && typeof err === 'string') {
      console.log('\x1b[41m%s\x1b[0m', err);
    } else if (!field && typeof err !== 'string') {
      console.log('\x1b[41m%s\x1b[0m', err);
    }
  },
  success: (logType: LogTypes, operation: string) => {
    if (!validateLoggerState(logType)) {
      return;
    }
    console.log(
      '\x1b[32m%s\x1b[0m',
      '< ' + operation + ' > has been successful.'
    );
  },
  log: (logType: LogTypes, logMsg: any) => {
    if (!validateLoggerState(logType)) {
      return;
    }
    console.log(logMsg);
  }
};
