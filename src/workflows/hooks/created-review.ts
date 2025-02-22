import { StepResponse } from "@medusajs/framework/workflows-sdk";
//import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
//import ReviewModuleService from "../../modules/review/service";
import { CreateReviewWorkflow } from "../create-review";
//import { container } from "@medusajs/framework";
import ReviewModule, { REVIEW_MODULE } from "../../modules/review";
import { Modules } from "@medusajs/framework/utils";

CreateReviewWorkflow.hooks.review_created(
  async ({ reviews }, { container }) => {
    //perform an action

    const link = container.resolve("link"); // Get the linking service
    const logger = container.resolve("logger"); // Get logger for debugging

    const links: LinkDefinition[] = [];

    for (const review of reviews) {
      links.push({
        [REVIEW_MODULE]: {
          review_id: review.id, // Reference the review ID
        },
        [Modules.CUSTOMER]: {
          customer_id: review.customer_id, // Reference the customer ID
        },
      });
    }

    // Create the links in the database
    await link.create(links);

    logger.info("Linked reviews to customers");

    return new StepResponse(links, links);
  },
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    await link.dismiss(links);
  }
);
