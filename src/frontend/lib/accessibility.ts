/**
 * Accessibility utilities for better UX
 */

// Announce to screen readers
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite",
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Focus trap for modals
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener("keydown", handleTabKey);

  return () => {
    element.removeEventListener("keydown", handleTabKey);
  };
}

// Skip to main content
export function addSkipLink() {
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Pular para o conteúdo principal";
  skipLink.className =
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md";

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Check if reduced motion is preferred
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
