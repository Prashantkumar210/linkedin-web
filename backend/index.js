import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";

dotenv.config();

let app = express();

// To get the data from the body we use express
// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ✅ to parse the Cookie we use this
app.use(cookieParser());

// Which frontend url send the request for the the Backend(to get the data )
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));


let port = process.env.PORT || 5000;

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// http://localhost:8000/api/auth/signup

// Test route
// app.get("/", (req, res) => {
//   res.send("Hello Prashant!");
// });


// Start server
app.listen(port, () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
