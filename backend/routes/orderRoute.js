import express from "express"
import asyncHandler from './../middleware/asyncHandler.js'
import Order from "../models/orderModel.js"
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getOrders,
    updateOrderToDelivered,
    deleteOrder
} from "../controllers/orderControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router()
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, admin, getOrderById).delete(protect, admin, deleteOrder)

router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.put('/:id/pay', protect, admin, updateOrderToPaid)

export default router