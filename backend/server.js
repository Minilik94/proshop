import express from "express"
import products from './data/products.js';
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
dotenv.config()
import productRoute from "./routes/productRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(cors(
    { origin: "*" }
))

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))