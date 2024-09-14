import { z } from "zod";

export const NEXT_PUBLIC_PORT = z.coerce
  .number()
  .int()
  .parse(process.env.NEXT_PUBLIC_PORT);

export const NEXT_PUBLIC_API_BASE_URL = z
  .string()
  .parse(process.env.NEXT_PUBLIC_API_BASE_URL);
