import express from "express";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = express();

app.use(express.json());

//routes;
app.use("/api/products", productRoutes);

app.listen(5000, () => {
	connectDb(), console.log(`listening at port http://localhost:5000`);
});

// xqmbo2wuYsOHOS4O
