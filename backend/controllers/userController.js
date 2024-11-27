import asyncHandler from './../middleware/asyncHandler.js'
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id)


        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {

    const { email, password, name } = req.body
    const userExists = await User.findOne({ email })

    if (!userExists) {
        const newUser = await User.create({ email, password, name })
        generateToken(res, newUser._id)

        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error("User already exists ")
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true
    })

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
    })
})


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "logged out"
    })
})

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')

})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    await user.remove()

    res.json({ message: 'User removed' })

})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.json(user)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    await User.updateMany({ _id: user._id }, { $set: req.body })

    res.json(user)
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}