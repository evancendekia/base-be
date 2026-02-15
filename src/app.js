import express from "express";
import cors from "cors";
import externalRoutes from "./routes/externalRoutes.js";
import testRoutes from "./routes/test.js";
import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/external", externalRoutes);
app.use('/api/test', testRoutes);


console.log(process.env.APP_ENV);
console.log(process.env.DATABASE_URL);


app.get("/", (req, res) => {
  res.json({
    app: config.appName,
    environment: process.env.APP_ENV || "local",
    message: "External Content API running 🚀",
    nodeVersion: process.version
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running  ${config.appName} on port ${PORT}`);
});
