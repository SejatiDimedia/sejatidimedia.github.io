import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Idiomatic React hook to detect client-side hydration without triggering
 * cascading re-renders or setState-in-effect warnings.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
