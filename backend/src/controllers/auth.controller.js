const userModel = require('../models/user.model')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req,res) =>{

    const {fullName,email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    const hashedPassword=await bcyrpt.hash(password, 10);

    const user  = await userModel.create({
        fullName,email,password:hashedPassword
    })
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token);

    res.status(201).json({
        message:"User Registered Successsfully",
        user:{
            id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcyrpt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token)

    res.status(200).json({
        message:"User Logged in Successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}
const logoutUser = async (req,res) =>{
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}
module.exports = {registerUser,loginUser,logoutUser}

