import express, { json, urlencoded } from "express";
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();
let corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(json());
app.use(cookieParser())
app.use(urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", tripRoutes);

// Error handler middlware
app.use(errorMiddleware);

export default app;
