import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: ".env" });

// Detect if running on Vercel (serverless)
const isVercel = !!process.env.VERCEL;

// Track DB connection (to avoid reconnecting on every serverless call)
let isConnected = false;

// -------------------------------
// MODE 1: VERSEL SERVERLESS MODE
// -------------------------------
export default async function handler(req, res) {
  if (!isVercel) return; // Only executed on Vercel

  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB Connected (Vercel)");
    }

    return app(req, res); // Express-style handling

  } catch (err) {
    console.error("Vercel Function Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


// ------------------------------
// MODE 2: LOCAL DEVELOPMENT MODE
// ------------------------------
if (!isVercel) {
  connectDB()
    .then(() => {
      const port = process.env.PORT || 8000;
      app.listen(port, () => {
        console.log("🚀 Local server running on http://localhost:" + port);
      });
    })
    .catch((err) => {
      console.error("MongoDB Connection Failed:", err);
      process.exit(1);
    });
}

