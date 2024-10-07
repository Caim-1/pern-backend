import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import auth from "./routes/auth";
import posts from "./routes/posts";
import users from "./routes/users";
import errorHandler from "./middleware/error";
import notFound from "./middleware/notFound";
import forums from "./routes/forums";

dotenv.config();

const app = express();
const port = process.env.DB_PORT || 3000;
const corsOptions = { credentials: true, origin: process.env.URL || "http://localhost:5173" };

// Body parser middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/forums", forums);
app.use("/api/posts", posts);
app.use("/api/users", users);

// Error handler
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
