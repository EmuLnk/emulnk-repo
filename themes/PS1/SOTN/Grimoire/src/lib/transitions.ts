import type { TransitionConfig } from "svelte/transition";

interface WipeParams {
  direction?: "right" | "left";
  duration?: number;
}

/** Gothic page-turn wipe using clip-path */
export function pageWipe(
  _node: Element,
  { direction = "right", duration = 250 }: WipeParams = {},
): TransitionConfig {
  return {
    duration,
    css: (t) => {
      const pct = (1 - t) * 100;
      const clip =
        direction === "right"
          ? `inset(0 ${pct}% 0 0)`
          : `inset(0 0 0 ${pct}%)`;
      return `clip-path: ${clip};`;
    },
  };
}
