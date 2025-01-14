import express from 'express'
import { isAdmin, isSeller, requireSignIn } from '../middlewares/authMiddleware.js'
import { categoryController, CreateCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

// routes
// create category
router.post('/create-category', requireSignIn, (req, res, next) => {
    isAdmin(req, res, (err) => {
        if (err) {
            isSeller(req, res, next);
        } else {
            next();
        }
    });
}, CreateCategoryController)

// update category
router.put('/update-category/:id', requireSignIn, (req, res, next) => {
    isAdmin(req, res, (err) => {
        if (err) {
            isSeller(req, res, next);
        } else {
            next();
        }
    });
}, updateCategoryController)

// getAll categories
router.get("/get-category", categoryController)

// sigle category
router.get("/single-category/:slug", singleCategoryController)

// delete category
router.delete("/delete-category/:id", requireSignIn, (req, res, next) => {
    isAdmin(req, res, (err) => {
        if (err) {
            isSeller(req, res, next);
        } else {
            next();
        }
    });
}, deleteCategoryController)

export default router