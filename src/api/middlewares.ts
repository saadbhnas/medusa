import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostAdminCreateReview } from "./admin/reviews/validators";
import { z } from "zod";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/reviews",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateReview as any)],
      additionalDataValidator: {
        customer_id: z.any(),
      },
    },
  ],
});
