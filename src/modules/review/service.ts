import { MedusaService } from "@medusajs/framework/utils";
import { Review } from "./models/review";

//The MedusaService function receives an object of the module's data models as a parameter, and generates methods to manage those data models. So, the BrandModuleService now has methods like createBrands and retrieveBrand to manage the Brand data model

class ReviewModuleService extends MedusaService({
  Review,
}) {}

export default ReviewModuleService;
