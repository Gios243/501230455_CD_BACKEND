import express from "express";
import { 
    listCategory, 
    createCategory, 
    renderPageCreateCategory, 
    renderPageUpdateCategory,
    updateCategory,
    renderPageDeleteCategory,
    deleteCategory,
    createCategoryByModal
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/", listCategory)

router.get("/create", renderPageCreateCategory) //render ra form create
router.post("/create", createCategory)
router.post("/createByModal", createCategoryByModal)

router.get("/update/:id", renderPageUpdateCategory) //render ra form create
router.post("/update/:id", updateCategory)

router.get("/delete/:id", renderPageDeleteCategory) //render ra form create
router.post("/delete", deleteCategory)

export default router;