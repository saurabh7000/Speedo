"use strict";
import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./config/database.js";


process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down due to uncaught exception`);

  process.exit(1);
});


config({ path: "backend/config/.env" });
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down due to unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
