/* eslint-disable no-console */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private sendToMonitoring(
    _level: LogLevel,
    _message: string,
    _error?: Error,
    _context?: LogContext,
  ) {
    // In production, send to monitoring service
    if (this.isProduction) {
      // TODO: Integrate with Sentry, DataDog, CloudWatch, etc.
      // Example:
      // Sentry.captureException(error, {
      //   level,
      //   extra: { message, ...context },
      // });
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage("info", message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("warn", message, context));
    this.sendToMonitoring("warn", message, undefined, context);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    console.error(this.formatMessage("error", message, context), error);
    this.sendToMonitoring("error", message, error, context);
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, context));
    }
  }

  // Specific logging methods for common scenarios
  authError(message: string, error?: Error): void {
    this.error(`[AUTH] ${message}`, error, { category: "authentication" });
  }

  apiError(message: string, error?: Error, endpoint?: string): void {
    this.error(`[API] ${message}`, error, { category: "api", endpoint });
  }

  paymentError(message: string, error?: Error): void {
    this.error(`[PAYMENT] ${message}`, error, { category: "payment" });
  }

  securityWarning(message: string, context?: LogContext): void {
    this.warn(`[SECURITY] ${message}`, { category: "security", ...context });
  }
}

export const logger = new Logger();
