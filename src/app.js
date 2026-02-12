import express from "express";
import cors from "cors";
import externalRoutes from "./routes/externalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/external", externalRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "External Content API running 🚀",
    nodeVersion: process.version
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
