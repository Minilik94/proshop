

import express from "express"
import products from './data/products.js';
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
dotenv.config()
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js"
import orderRoute from "./routes/orderRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import cookieParser from "cookie-parser";
import morgan from "morgan";

// connectDB()

const port = process.env.PORT || 5000

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cors(
    { origin: "*" }
))

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)

app.use(notFound)
app.use(errorHandler)

