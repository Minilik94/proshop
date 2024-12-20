import express from "express"
import asyncHandler from './../middleware/asyncHandler.js'
import User from "../models/userModel.js"
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()
router.route('/').post(registerUser).get(protect, admin, getUsers)


router.post('/auth', authUser)

router.post("/logout", logoutUser)

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser)


export default router
