import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  desc: z.string({
    required_error: "Description is required",
  }),
  date: z.string().datetime().optional(),
});
