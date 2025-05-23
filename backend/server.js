import express from "express";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello");
});

// get all products;
app.get("/api/products", async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error fetching products", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

// create new product;
app.post("/api/products", async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({
			success: false,
			message: "All fields required",
		});
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({
			success: true,

			data: newProduct,
		});
	} catch (error) {
		console.error(`Error at create product: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
});

// update a product;
app.put("/api/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(404)
				.json({ success: false, message: "Invalid product id" });
		}
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
});

// delete a product;
app.delete("/api/products/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Product not found",
		});
	}
});

app.listen(5000, () => {
	connectDb(), console.log(`listening at port http://localhost:5000`);
});

// xqmbo2wuYsOHOS4O
