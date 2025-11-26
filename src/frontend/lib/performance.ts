/**
 * Performance utilities and monitoring
 */

// Measure component render time
export function measureRenderTime(componentName: string) {
  if (typeof window === "undefined") return;

  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Performance] ${componentName} rendered in ${renderTime.toFixed(2)}ms`,
      );
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production" && renderTime > 1000) {
      console.warn(
        `[Performance] Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`,
      );
    }
  };
}

// Preload critical resources
export function preloadResource(
  href: string,
  as: "script" | "style" | "font" | "image",
) {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;

  if (as === "font") {
    link.crossOrigin = "anonymous";
  }

  document.head.appendChild(link);
}

// Lazy load images
export function lazyLoadImage(img: HTMLImageElement) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          const src = image.dataset.src;

          if (src) {
            image.src = src;
            image.removeAttribute("data-src");
            observer.unobserve(image);
          }
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    const src = img.dataset.src;
    if (src) {
      img.src = src;
    }
  }
}

// Cache API responses
export class ResponseCache<T = unknown> {
  private cache: Map<string, { data: T; timestamp: number }> = new Map();
  private ttl: number;

  constructor(ttlMinutes: number = 5) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key: string, data: T) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const cached = this.cache.get(key);

    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

// Throttle function
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Check if user is on slow connection
export function isSlowConnection(): boolean {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return false;
  }

  const connection = (
    navigator as { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;

  return (
    connection?.saveData ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    false
  );
}
