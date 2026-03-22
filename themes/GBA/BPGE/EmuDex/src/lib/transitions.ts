import type { TransitionConfig } from "svelte/transition";

interface ScreenWipeParams {
	direction?: "left" | "right";
	duration?: number;
}

export function screenWipe(
	_node: Element,
	{ direction = "right", duration = 200 }: ScreenWipeParams = {}
): TransitionConfig {
	return {
		duration,
		css: (t) => {
			// Interpolate clip-path inset from fully clipped to fully visible
			const pct = (1 - t) * 100;
			const clip = direction === "right"
				? `inset(0 ${pct}% 0 0)`
				: `inset(0 0 0 ${pct}%)`;
			return `clip-path: ${clip};`;
		},
	};
}
