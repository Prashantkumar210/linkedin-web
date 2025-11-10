import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";

dotenv.config();
let app = express();

// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));


let port = process.env.PORT || 5000;

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Test route
// app.get("/", (req, res) => {
//   res.send("Hello Prashant!");
// });


// Start server
app.listen(port, () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
