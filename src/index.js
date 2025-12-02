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

// Serverless handler (Vercel)
const handler = serverless(app);

export default async function handlerVercel(req, res) {
  try {
    // Connect to DB only once (serverless cold start)
    if (!global.mongooseConnected) {
      await connectDB();
      global.mongooseConnected = true;
    }

    return handler(req, res);
  } catch (error) {
    console.error("❌ Serverless Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// FOR LOCAL DEVELOPMENT ONLY
if (!process.env.VERCEL) {
  connectDB().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log("🚀 Local server running at http://localhost:" + port);
    });
  });
}



