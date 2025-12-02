import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import serverless from "serverless-http";

dotenv.config({ path: ".env" });

// Detect if running on Vercel
const isVercel = !!process.env.VERCEL;

// Track DB connection
let isConnected = false;

// Wrap Express app using serverless-http
const handler = serverless(app);

// -------------------------------------
// VERCEL SERVERLESS HANDLER (ES MODULE)
// -------------------------------------
export default async function vercelHandler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected (Vercel)");
    }

    return handler(req, res); // serverless express handler
  } catch (err) {
    console.error("❌ Vercel Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------------
// LOCAL DEVELOPMENT SERVER
// -------------------------------------
if (!isVercel) {
  connectDB().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log("🚀 Local server running at http://localhost:" + port);
    });
  });
}
