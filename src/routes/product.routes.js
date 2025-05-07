// ^--------------------Imports
import { Router } from "express";
import productControllers from "../controllers/product.controller.js";
import productValidation from "../validation/product.validation.js";
import validateRequestBody from "../middlewares/schemaValidation.middleware.js";
import systemRoles from "../utils/systemRoles.js";
import authenticate from "../middlewares/authentication.middleware.js";

const productRouter = new Router();

productRouter
  .route("/")
  .get(productControllers.getAllProducts)
  .post(authenticate([systemRoles.admin]), validateRequestBody(productValidation.addProductValidation), productControllers.addNewProduct);

productRouter
  .route("/:id")
  .get(productControllers.getProductById)
  .delete(authenticate([systemRoles.admin]), productControllers.deleteProduct)
  .put(authenticate([systemRoles.admin]), validateRequestBody(productValidation.updateProductValidation), productControllers.updateProduct);

productRouter.get("/category/:categoryName", productControllers.getProductsByCategory);

productRouter.get("/label/:label", productControllers.getProductsByLabel);

export default productRouter;
