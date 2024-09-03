import z from "zod";

export type SchemaOf<T> = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [K in keyof T]: z.ZodType<T[K], any, any>;
};
