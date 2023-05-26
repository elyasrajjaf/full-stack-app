import express from "express";
import connectionDB from "./config/database.js";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// Routes
import meubleRoutes from "./routes/meuble.routes.js";

dotenv.config();

const app = express();
const port = process.env.BACK_PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(meubleRoutes);

function main() {
  try {
    connectionDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();