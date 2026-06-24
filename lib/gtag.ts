declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function gtagEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
