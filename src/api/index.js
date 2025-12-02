import dotenv from "dotenv";
import connectDB from "../db/index.js";
import app from "../app.js";
import serverless from "serverless-http";

dotenv.config();

let isConnected = false;
const handlerExpress = serverless(app);

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected (serverless)");
    }

    return handlerExpress(req, res);
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
