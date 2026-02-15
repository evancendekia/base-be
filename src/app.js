import express from "express";
import cors from "cors";
import externalRoutes from "./modules/external/external.routes.js";
import testRoutes from "./modules/test/test.routes.js";
import articleRoutes from "./modules/article/article.routes.js";
import dotenv from "dotenv";
dotenv.config();
import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/external", externalRoutes);
app.use('/api/test', testRoutes);
app.use("/api/articles", articleRoutes);


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
