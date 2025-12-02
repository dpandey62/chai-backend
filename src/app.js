
// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"


// const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(express.json());
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())
// app.get("/", (req, res) => {
//   res.json({ message: "Chai Backend is LIVE on Vercel!", uptime: process.uptime() })
// })

// //routes import
// import userRouter from './routes/user.router.js'
// import productRoutes from './routes/product.routes.js';
//  import { errorHandler } from "./middlewares/error.middleware.js"
// // import healthcheckRouter from "./routes/healthcheck.router.js"
// // import tweetRouter from "./routes/tweet.router.js"
// // import subscriptionRouter from "./routes/subscription.router.js"
// // import videoRouter from "./routes/video.router.js"
// // import commentRouter from "./routes/comment.router.js"
// // import likeRouter from "./routes/like.router.js"
// // import playlistRouter from "./routes/playlist.router.js"
// // import dashboardRouter from "./routes/dashboard.router.js"

// //routes declaration
// // app.use("/api/v1/healthcheck", healthcheckRouter)
//  app.use("/api/v1/users", userRouter)
//  app.use('/api/v1/products', productRoutes);
// // app.use("/api/v1/tweets", tweetRouter)
// // app.use("/api/v1/subscriptions", subscriptionRouter)
// // app.use("/api/v1/videos", videoRouter)
// // app.use("/api/v1/comments", commentRouter)
// // app.use("/api/v1/likes", likeRouter)
// // app.use("/api/v1/playlist", playlistRouter)
// // app.use("/api/v1/dashboard", dashboardRouter)

// // http://localhost:8000/api/v1/users/register

// //error middleware
// app.use(errorHandler);

// export default app

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ------------------------
// FIXED CORS CONFIG
// ------------------------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",   // Allow all if undefined
    credentials: true,
  })
);

// ------------------------
// Middlewares
// ------------------------
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ------------------------
// Root route
// ------------------------
app.get("/", (req, res) => {
  res.json({
    message: "Chai Backend is LIVE on Vercel!",
    uptime: process.uptime(),
  });
});

// ------------------------
// Routes import
// ------------------------
import userRouter from "./routes/user.router.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// ------------------------
// Routes use
// ------------------------
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRoutes);

// ------------------------
// Error Handler
// ------------------------
app.use(errorHandler);

export default app;
