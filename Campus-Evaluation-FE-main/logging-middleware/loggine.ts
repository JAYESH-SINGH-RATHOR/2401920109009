/**
 * Logging Middleware - Reusable Package
 * Supports both Backend and Frontend stacks
 */

interface LogConfig {
  clientID?: string;
  clientSecret?: string;
  stack: 'backend' | 'frontend';
  apiEndpoint: string;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface BackendPackages {
  cache?: boolean;
  controller?: boolean;
  cron_job?: boolean;
  db?: boolean;
  handler?: boolean;
  repository?: boolean;
  route?: boolean;
  service?: boolean;
}

interface FrontendPackages {
  api?: boolean;
  component?: boolean;
  hook?: boolean;
  page?: boolean;
  state?: boolean;
}

interface SharedPackages {
  style?: boolean;
  auth?: boolean;
  config?: boolean;
  middleware?: boolean;
}

type ValidPackage = keyof (BackendPackages & FrontendPackages & SharedPackages);

interface LogPayload {
  stack: 'backend' | 'frontend';
  level: LogLevel;
  package: ValidPackage;
  message: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private config: LogConfig;
  private logQueue: LogPayload[] = [];
  private isProcessing = false;

  constructor(config: LogConfig) {
    this.config = config;
  }

  /**
   * Main logging function
   * Log(stack, level, package, message)
   */
  public log(
    stack: 'backend' | 'frontend',
    level: LogLevel,
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    const payload: LogPayload = {
      stack,
      level,
      package: packageName,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // Console output for development
    this.consoleLog(payload);

    // Queue for batch sending
    this.logQueue.push(payload);

    // Send if queue is large enough
    if (this.logQueue.length >= 5) {
      this.flush();
    }
  }

  /**
   * Convenience methods for different log levels
   */
  public debug(
    stack: 'backend' | 'frontend',
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    this.log(stack, 'debug', packageName, message, metadata);
  }

  public info(
    stack: 'backend' | 'frontend',
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    this.log(stack, 'info', packageName, message, metadata);
  }

  public warn(
    stack: 'backend' | 'frontend',
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    this.log(stack, 'warn', packageName, message, metadata);
  }

  public error(
    stack: 'backend' | 'frontend',
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    this.log(stack, 'error', packageName, message, metadata);
  }

  public fatal(
    stack: 'backend' | 'frontend',
    packageName: ValidPackage,
    message: string,
    metadata?: Record<string, any>
  ): void {
    this.log(stack, 'fatal', packageName, message, metadata);
  }

  /**
   * Send logs to the server
   */
  public async flush(): Promise<void> {
    if (this.logQueue.length === 0 || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    const logsToSend = [...this.logQueue];
    this.logQueue = [];

    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.clientID && { 'X-Client-ID': this.config.clientID }),
          ...(this.config.clientSecret && { 'X-Client-Secret': this.config.clientSecret }),
        },
        body: JSON.stringify({
          logs: logsToSend,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to send logs: ${response.statusText}`);
        // Re-queue failed logs
        this.logQueue.push(...logsToSend);
      }
    } catch (error) {
      console.error('Error sending logs:', error);
      // Re-queue failed logs
      this.logQueue.push(...logsToSend);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Console output with color coding
   */
  private consoleLog(payload: LogPayload): void {
    const colors = {
      debug: '\x1b[36m',   // Cyan
      info: '\x1b[32m',    // Green
      warn: '\x1b[33m',    // Yellow
      error: '\x1b[31m',   // Red
      fatal: '\x1b[35m',   // Magenta
      reset: '\x1b[0m',
    };

    const color = colors[payload.level as keyof typeof colors] || colors.reset;
    const timestamp = payload.timestamp;
    const logMessage = `${color}[${payload.stack.toUpperCase()}] [${payload.level.toUpperCase()}] [${payload.package}] ${timestamp}${colors.reset}\n${payload.message}`;

    if (payload.metadata) {
      console.log(logMessage, payload.metadata);
    } else {
      console.log(logMessage);
    }
  }

  /**
   * Ensure logs are sent before shutdown
   */
  public async shutdown(): Promise<void> {
    await this.flush();
  }
}

export { Logger, LogConfig, LogPayload, LogLevel };