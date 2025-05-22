import express from "express";
import { connectDb } from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(5000, () => {
	connectDb(), console.log(`listening at port http://localhost:5000`);
});

// xqmbo2wuYsOHOS4O
