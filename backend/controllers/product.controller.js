import mongoose from "mongoose";
import Product from "../models/product.model.js";


// fetch all the products from db;
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error fetching products", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// add a new product to db;
export const createNewProduct = async (req, res) => {
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
};

// change a product in db;
export const updateProduct = async (req, res) => {
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
};

// remove a product from db;
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid product id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Product not found",
		});
	}
};
