import { z } from "zod";

export const PostAdminCreateReview = z.object({
  title: z.string(),
  description: z.string(),
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5"),
  image: z.string(),
});
