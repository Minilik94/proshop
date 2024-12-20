import asyncHandler from './../middleware/asyncHandler.js'
import Product from "../models/productModel.js"

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    if (products) {

        return res.json(products)
    }

    res.status(404)
    throw new Error("Resource not found")
})

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
})