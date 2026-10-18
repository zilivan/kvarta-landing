import { useSyncExternalStore } from "react";

export type OrderType = "one-time" | "subscription" | "question";

export type OrderIntent = {
  type: OrderType;
  product: string | null;
};

let currentIntent: OrderIntent | null = null;
const listeners = new Set<() => void>();

export function setOrderIntent(intent: OrderIntent) {
  currentIntent = intent;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentIntent;
}

function getServerSnapshot() {
  return null;
}

export function useOrderIntent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
