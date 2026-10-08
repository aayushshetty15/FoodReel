const foodPartnerModel = require("../models/foodPartner.model")
const jwt = require('jsonwebtoken')


const authFoodPartnerMiddleware = async(req,res,next) =>{


    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please Login First"
        })
    }

    try{

       const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

       const foodPartner = await foodPartnerModel.findById(decoded.id);

       req.foodPartner = foodPartner

       next()

    }catch(err){

        return res.status(401).json({
            message:"Invalid token"
        })
    }

}

module.exports={
    authFoodPartnerMiddleware,

}