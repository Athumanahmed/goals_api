const User  = require("../models/userModel")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find({})
        res.status(200).json({
            count:users.length,
            data:users
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:error.message
        })
        
    }
}

const getMe = async(req, res) =>{
    try {
        const {_id , name , email} = await User.findById(req.user.id)
        res.status(200).json({
            id:_id,
            name, 
            email
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:error.message
        })
        
    }
}

const registerUser = async(req, res) =>{
    try {
       const {name,email,password} = req.body

       if(!name || !email || !password){
                res.status(404)
                throw new Error("please add all fields")
        }

        // check if user exist 
        const userExist = await User.findOne({email})
        if(userExist) {
            res.status(404)
            throw new Error("User Already exist.")
        }


        // hashpassword
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password , salt)

        // create a user 
        const user = await User.create({
            name, 
            email,
            password:hashedpassword
        })


        res.status(201).json({
            user,
            token:generateToken(user._id)
        })

            // if(user) {
            //     res.status(201).json({
            //         _id:user.id,
            //         name:user.name,
            //         email:user.email,
            //         password:user.hashedpassword
            //     })
            // }else{
            //     console.log(error)
            //     throw new Error("Invalid user data")
            // }

    } catch (error) {
        console.log(error)
        res.status(404).json({
            mesage:error.message
        })
    }
}

const loginUser = async(req, res) =>{
try {
    const {email , password} = req.body

    const user = await User.findOne({email})

    // matching password
    if(user && (await bcrypt.compare(password , user.password))){
        res.status(201).json({
            user,
            token:generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error("Invalid credentials.")
    }
} catch (error) {
    console.log(error)
    res.status(404).json({
        message:error.message
    })
    
}
}

const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:'2d'})
}
module.exports ={
    getAllUsers,
    getMe,
    registerUser,
    loginUser
}