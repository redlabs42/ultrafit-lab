/**
 * Sanitize user input to prevent XSS attacks
 * Using manual sanitization to work in both SSR and client-side
 */
export const sanitize = {
    /**
     * Sanitize a string input (removes HTML tags and scripts)
     */
    string(input: string): string {
        if (typeof input !== "string") return "";
        // Remove HTML tags, script tags, and trim
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/<[^>]*>/g, "")
            .trim();
    },

    /**
     * Sanitize an email address
     */
    email(input: string): string {
        const sanitized = this.string(input).trim().toLowerCase();
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(sanitized) ? sanitized : "";
    },

    /**
     * Sanitize a name (allows letters, spaces, hyphens, apostrophes)
     */
    name(input: string): string {
        const sanitized = this.string(input).trim();
        // Remove any characters that aren't letters, spaces, hyphens, or apostrophes
        return sanitized.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
    },

    /**
     * Sanitize HTML content (basic - removes scripts and dangerous tags)
     */
    html(input: string): string {
        if (typeof input !== "string") return "";
        // Remove script tags and event handlers
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
            .replace(/on\w+\s*=\s*[^\s>]*/gi, "");
    },

    /**
     * Sanitize a URL
     */
    url(input: string): string {
        try {
            const url = new URL(input);
            // Only allow http and https protocols
            if (url.protocol === "http:" || url.protocol === "https:") {
                return url.toString();
            }
            return "";
        } catch {
            return "";
        }
    },

    /**
     * Sanitize a phone number (removes non-numeric characters)
     */
    phone(input: string): string {
        return input.replace(/\D/g, "");
    },

    /**
     * Sanitize an object's string values
     */
    object<T extends Record<string, unknown>>(obj: T): T {
        const sanitized = { ...obj };
        for (const key in sanitized) {
            if (typeof sanitized[key] === "string") {
                sanitized[key] = this.string(
                    sanitized[key] as string,
                ) as T[Extract<keyof T, string>];
            }
        }
        return sanitized;
    },
};
