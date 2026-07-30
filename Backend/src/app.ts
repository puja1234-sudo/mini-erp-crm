import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import challanRoutes from "./routes/challan.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/challans", challanRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Mini ERP CRM API is Running 🚀");
});

export default app;