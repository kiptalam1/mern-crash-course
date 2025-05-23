import express from "express";
import {
	createNewProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createNewProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
