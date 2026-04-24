export const WAITLIST_URL = "https://joaoomr.github.io/soci-waitlist";
export const WAITLIST_EVENT = "soci:waitlist";

export function openWaitlist() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(WAITLIST_EVENT));
  }
}
