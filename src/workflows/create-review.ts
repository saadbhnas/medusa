import {
  createStep,
  StepResponse,
  WorkflowResponse,
  createWorkflow,
  createHook,
  WorkflowData,
} from "@medusajs/framework/workflows-sdk";
import { REVIEW_MODULE } from "../modules/review";
import ReviewModuleService from "../modules/review/service";

export type CreateReviewStepInput = {
  title: string;
  description: string;
  rating: number;
  image: string;
};

export const createReviewStep = createStep(
  "create-review-step",
  async (input: CreateReviewStepInput, { container }) => {
    const reviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE);

    const review = await reviewModuleService.createReviews(input);

    return new StepResponse(review, review.id);
  },
  async (id: string, { container }) => {
    const ReviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE);

    await ReviewModuleService.deleteReviews(id);
  }
);

type CreateReviewWorkflowInput = {
  title: string;
  description: string;
  rating: number;
  image: string;
};

export const CreateReviewWorkflow = createWorkflow(
  "create-review",
  (input: CreateReviewWorkflowInput) => {
    // Create review step (assume it supports batch creation)
    const reviews = createReviewStep(input);

    // Ensure that `reviews` is an array
    const reviewsArray = Array.isArray(reviews) ? reviews : [reviews];
    const transformedReviewsArray = reviewsArray.map((review) => ({
      id: review.id as WorkflowData<string>,
      title: review.title as WorkflowData<string>,
      description: review.description as WorkflowData<string>,
      rating: review.rating as WorkflowData<number>,
      image: review.image as WorkflowData<string>,
      created_at: review.created_at as WorkflowData<Date>,
      updated_at: review.updated_at as WorkflowData<Date>,
      deleted_at: review.deleted_at as WorkflowData<Date | null>,
    }));

    // Pass reviews as a list
    const ReviewCreated = createHook("review_created", {
      reviews: reviewsArray,
    });

    return new WorkflowResponse(transformedReviewsArray, {
      hooks: [ReviewCreated],
    });
  }
);
