// import dotenv from 'dotenv';
// import connectDB from './db/index.js';
// import {app }from './app.js'; 
// //import './config/express.js';

// dotenv.config({
//     path: './.env'
// })

// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//  });
// }).catch((error) => {
//     console.error('Database connection failed:', error);
//     process.exit(1); // Exit the process with failure
// }

// );
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"   // ← default import (kyunki ab app.js mein default export hai)

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        const port = process.env.PORT || 8000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err)
        process.exit(1)
    })


export default app