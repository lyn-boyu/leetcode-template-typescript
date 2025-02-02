import chalk from 'chalk';
import { mkdir, appendFile, readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { format } from 'util';
import loggerConfig from '../config/logger.config.json';

type LogLevel = 'info' | 'success' | 'error' | 'warn' | 'debug';

interface LoggerConfig {
  debug: boolean;
  retention: {
    days: number;
    enabled: boolean;
  };
  levels: {
    [key in LogLevel]: boolean;
  };
}

class Logger {
  private config: LoggerConfig;
  private logDir: string;

  constructor() {
    this.config = loggerConfig;
    this.logDir = join(process.cwd(), 'logs');
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.ensureLogDir();
    if (this.config.retention.enabled) {
      await this.cleanupOldLogs();
    }
  }

  private async ensureLogDir(): Promise<void> {
    await mkdir(this.logDir, { recursive: true });
  }

  private async cleanupOldLogs(): Promise<void> {
    try {
      const files = await readdir(this.logDir);
      const now = new Date();
      const retentionMs = this.config.retention.days * 24 * 60 * 60 * 1000;

      for (const file of files) {
        const filePath = join(this.logDir, file);
        const dateStr = file.match(/\d{4}-\d{2}-\d{2}/)?.[0];

        if (dateStr) {
          const fileDate = new Date(dateStr);
          if (now.getTime() - fileDate.getTime() > retentionMs) {
            await unlink(filePath);
            if (this.config.debug) {
              console.log(chalk.gray(`Cleaned up old log file: ${file}`));
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to cleanup old logs:', error);
    }
  }

  private async writeToFile(level: LogLevel, message: string, ...args: any[]): Promise<void> {
    if (!this.config.debug) return;

    try {
      const timestamp = new Date().toISOString();
      const logFile = join(this.logDir, `${level}-${timestamp.split('T')[0]}.log`);

      const formattedMessage = format(message, ...args);
      const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${formattedMessage}\n`;

      if (args.length > 0 && args[args.length - 1] instanceof Error) {
        const error = args[args.length - 1];
        const stackTrace = `Stack Trace:\n${error.stack}\n`;
        await appendFile(logFile, logEntry + stackTrace);
      } else {
        await appendFile(logFile, logEntry);
      }
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return this.config.levels[level];
  }

  public setDebugMode(enabled: boolean): void {
    this.config.debug = enabled;
  }

  public setRetention(days: number): void {
    this.config.retention.days = days;
  }

  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.log(chalk.blue('ℹ'), chalk.blue(message), ...args);
    }
    this.writeToFile('info', message, ...args);
  }

  public success(message: string, ...args: any[]): void {
    if (this.shouldLog('success')) {
      console.log(chalk.green('✓'), chalk.green(message), ...args);
    }
    this.writeToFile('success', message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(chalk.red('✖'), chalk.red(message), ...args);
    }
    this.writeToFile('error', message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(chalk.yellow('⚠'), chalk.yellow(message), ...args);
    }
    this.writeToFile('warn', message, ...args);
  }

  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(chalk.gray('🔍'), chalk.gray(message), ...args);
    }
    this.writeToFile('debug', message, ...args);
  }

  public logError(error: Error, context?: string): void {
    const message = context ? `${context}: ${error.message}` : error.message;
    this.error(message, error);
  }
}

export const logger = new Logger();