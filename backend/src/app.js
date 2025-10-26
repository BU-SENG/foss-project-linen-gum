import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Aidly API!");
});

export default app;
