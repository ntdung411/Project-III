import express from "express";
import { isAdmin, isSeller, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignIn,
  (req, res, next) => {
    isAdmin(req, res, (err) => {
      if (err) {
        isSeller(req, res, next);
      } else {
        next();
      }
    });
  },
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  (req, res, next) => {
    isAdmin(req, res, (err) => {
      if (err) {
        isSeller(req, res, next);
      } else {
        next();
      }
    });
  },
  formidable(),
  updateProductController
);

// get products
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search prodcuct
router.get("/search/:keyword", searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController);

//Category wise product
router.get('/product-category/:slug', productCategoryController);

//Payment route
//Token
router.get('/braintree/token', braintreeTokenController);

//Payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

export default router;
