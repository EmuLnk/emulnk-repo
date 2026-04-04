export interface TransformContext<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly values: Readonly<T>;
  readonly settings: Readonly<Record<string, string>>;
  readonly isConnected: boolean;
}

export type TransformResult = Record<string, unknown>;

export interface TransformDefinition<T extends Record<string, unknown> = Record<string, unknown>> {
  id: string;
  inputs: string[];
  after?: string[];
  fn: (ctx: TransformContext<T>) => TransformResult | null;
}
