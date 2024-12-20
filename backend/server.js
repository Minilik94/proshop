// import express from "express"
// import products from './data/products.js';
// import dotenv from "dotenv"
// import cors from "cors"
// import connectDB from "./config/db.js";
// dotenv.config()
// import productRoute from "./routes/productRoute.js"
// import userRoute from "./routes/userRoute.js"
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
// import cookieParser from "cookie-parser";

// connectDB()

// const port = process.env.PORT || 5000

// export const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use(cookieParser())

// app.use(cors(
//     { origin: "*" }
// ))

// app.get('/', (req, res) => {
//     res.send('API is running')
// })

// app.use('/api/products', productRoute)
// app.use('/api/users', userRoute)

// app.use(notFound)
// app.use(errorHandler)

// app.listen(port, () => console.log(`Server is running on port ${port}`))


import { mongoose } from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";


dotenv.config({ path: "./.env" });
const DB = process.env.MONGO_URL
mongoose.connect(DB, {
    useUnifiedTopology: true,
})
    .then(() => console.log('DB Connected Successfuly!'))


const port = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`App running in port: ${port}`);
});
