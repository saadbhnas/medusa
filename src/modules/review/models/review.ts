import { model } from "@medusajs/framework/utils";

export const Review = model.define("review", {
  id: model.id().primaryKey(),
  title: model.text(),
  description: model.text(),
  rating: model.float(),
  image: model.text(),
});
