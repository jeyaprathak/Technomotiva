const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/test", (req, res) => {
  res.send("SERVER IS WORKING");
});
app.use("/api/test", require("./routes/testRoutes"));


// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));   // login / register
app.use("/api/user", require("./routes/userRoutes"));// push-token
app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/OrderRoutes"));



// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
