// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import app from "./app.js";
// import serverless from "serverless-http";

// dotenv.config({ path: ".env" });
// console.log("🔥 Vercel handler loaded!");

// // Detect Vercel environment
// const isVercel = process.env.VERCEL ? true : false;

// // Track MongoDB connection for serverless cold starts
// let isConnected = false;

// // Wrap Express app for Vercel serverless runtime
// const handler = serverless(app);

// // --------------------------------------------------
// //  VERCEL SERVERLESS HANDLER (export default for ESM)
// // --------------------------------------------------
// export default async function vercelHandler(req, res) {
//   try {
//     if (!isConnected) {
//       await connectDB();
//       isConnected = true;
//       console.log("MongoDB connected (Vercel)");
//     }

//     return handler(req, res);
//   } catch (err) {
//     console.error("❌ Vercel Handler Error:", err);
//     return res.status(500).json({
//       error: err.message || "Server error",
//     });
//   }
// }

// // --------------------------------------------------
// //  LOCAL DEVELOPMENT MODE (no serverless needed)
// // --------------------------------------------------
// if (!isVercel) {
//   connectDB()
//     .then(() => {
//       const port = process.env.PORT || 8000;
//       app.listen(port, () => {
//         console.log(`🚀 Local server running at http://localhost:${port}`);
//       });
//     })
//     .catch((error) => {
//       console.error("❌ Local MongoDB Connection Failed:", error);
//       process.exit(1);
//     });
// }


import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import serverless from "serverless-http";

dotenv.config();

// Wrap express app for serverless
const expressHandler = serverless(app);

// Track DB connection
let isConnected = false;

// -----------------------------
// 🚀 VERCEL SERVERLESS HANDLER
// -----------------------------
export default async function handler(req, res) {
  try {
    // Connect only once (cold start)
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB Connected (Vercel)");
    }

    return expressHandler(req, res);

  } catch (error) {
    console.error("❌ Serverless Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

// -----------------------------
// 🚀 LOCAL DEVELOPMENT MODE
// -----------------------------
if (!process.env.VERCEL) {
  connectDB().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log("Local server running → http://localhost:" + port);
    });
  });
}





