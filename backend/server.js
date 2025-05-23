import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = express();

app.use(express.json());

//routes;
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	connectDb(), console.log(`listening at port http://localhost:${PORT}`);
});

// xqmbo2wuYsOHOS4O
