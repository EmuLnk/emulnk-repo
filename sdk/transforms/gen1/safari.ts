import type { TransformDefinition } from "../types.js";
import type { Gen1SafariState } from "./types.js";

export const safariTransform: TransformDefinition = {
  id: "safari",
  inputs: ["safari_escape_factor", "safari_bait_factor", "safari_steps", "safari_balls"],
  fn(ctx) {
    const values = ctx.values as Record<string, unknown>;
    const safari: Gen1SafariState = {
      escapeFactor: (values.safari_escape_factor as number) || 0,
      baitFactor: (values.safari_bait_factor as number) || 0,
      steps: (values.safari_steps as number) || 0,
      balls: (values.safari_balls as number) || 0,
      active: ((values.safari_steps as number) || 0) > 0 || ((values.safari_balls as number) || 0) > 0,
    };

    return { safari };
  },
};
