import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes); 
app.use("/api/tasks", taskRoutes); 

app.get("/", (req, res) => {
  res.send("API is running...");
});

//define port
const PORT = process.env.PORT || 5000;

//connect to MongoDB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1); 
});