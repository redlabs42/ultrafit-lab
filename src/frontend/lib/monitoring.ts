/**
 * Monitoring and logging utilities
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  info(message: string, context?: Record<string, unknown>) {
    const entry = this.formatMessage("info", message, context);

    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || "");
    }

    // Send to monitoring service in production
    this.sendToMonitoring(entry);
  }

  warn(message: string, context?: Record<string, unknown>) {
    const entry = this.formatMessage("warn", message, context);

    console.warn(`[WARN] ${message}`, context || "");
    this.sendToMonitoring(entry);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    const entry = this.formatMessage("error", message, {
      ...context,
      error: error
        ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
          }
        : undefined,
    });

    console.error(`[ERROR] ${message}`, error, context || "");
    this.sendToMonitoring(entry);
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (!this.isDevelopment) return;

    const _entry = this.formatMessage("debug", message, context);
    console.debug(`[DEBUG] ${message}`, context || "");
  }

  private sendToMonitoring(_entry: LogEntry) {
    // TODO: Implement monitoring service integration
    // Examples: Sentry, LogRocket, DataDog, etc.

    if (process.env.NODE_ENV === "production") {
      // Send to your monitoring service
      // Example: Sentry.captureMessage(entry.message, entry.level);
    }
  }
}

export const logger = new Logger();

// Performance monitoring
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  start(label: string) {
    this.marks.set(label, performance.now());
  }

  end(label: string) {
    const startTime = this.marks.get(label);

    if (!startTime) {
      logger.warn(`Performance mark "${label}" not found`);
      return;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(label);

    logger.debug(`Performance: ${label}`, {
      duration: `${duration.toFixed(2)}ms`,
    });

    // Send to analytics if duration is significant
    if (duration > 1000) {
      logger.warn(`Slow operation: ${label}`, {
        duration: `${duration.toFixed(2)}ms`,
      });
    }

    return duration;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
  logger.error("Unhandled error", error, context);

  // TODO: Send to error tracking service
  // Example: Sentry.captureException(error, { extra: context });
}

// User action tracking
export function trackAction(
  action: string,
  properties?: Record<string, unknown>,
) {
  logger.info(`User action: ${action}`, properties);

  // TODO: Send to analytics service
  // Example: analytics.track(action, properties);
}

// Page view tracking
export function trackPageView(
  path: string,
  properties?: Record<string, unknown>,
) {
  logger.info(`Page view: ${path}`, properties);

  // TODO: Send to analytics service
  // Example: analytics.page(path, properties);
}
