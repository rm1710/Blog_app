import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
