import express from "express";
import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello");
});

// create new product;
app.post("/products", async (req, res) => {
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

// delete a product;
app.delete("/products/:id", async (req, res) => {
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
