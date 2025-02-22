import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { CreateReviewWorkflow } from "../../../workflows/create-review";
import { z } from "zod";
import { PostAdminCreateReview } from "./validators";

type PostAdminCreateReviewType = z.infer<typeof PostAdminCreateReview>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateReviewType>,
  res: MedusaResponse
) => {
  const { result } = await CreateReviewWorkflow(req.scope).run({
    input: req.validatedBody as any,
  });

  res.json({ review: result });
};
