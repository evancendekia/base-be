import express from "express";
import config from "./config.js";
import cors from "cors";
import articleRoutes from "./modules/article/article.routes.js";
import topicRoutes from "./modules/topics/topic.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import testRoutes from "./modules/test/test.routes.js";
import userRoutes from "./modules/user/user.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/test', testRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/topics", topicRoutes);


console.log(process.env);


app.get("/", (req, res) => {
  res.json({
    app: process.env.appName,
    environment: process.env.APP_ENV || "local",
    message: "Backend API running successfully",
    nodeVersion: process.version
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running  ${process.env.appName} on port ${PORT}`);
});
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET missing in environment variables");
  process.exit(1);
}
