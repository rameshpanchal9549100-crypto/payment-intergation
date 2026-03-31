import express from "express";
import payment from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use("/api/v1", payment);

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API Working");
});

export default app;