import asyncHandler from './../middleware/asyncHandler.js'
import Order from "../models/orderModel.js"

export const addOrderItems = asyncHandler(async (req, res) => {
    const user = req.user
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    }

    const order = new Order({
        user: user._id,
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
})

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update Order To Paid')
})

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update Order To Delivered')
})

export const getOrders = asyncHandler(async (req, res) => {
    res.send('get Orders')
})

export const deleteOrder = asyncHandler(async (req, res) => {
    res.send('delete Order')
})