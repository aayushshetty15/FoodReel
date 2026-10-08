const foodModel = require('../models/food.model');
const imageKit = require('../services/storage.service');

async function createFood(req,res) {
    console.log(req.foodPartner)
    console.log(req.body)
     console.log(req.file)
    res.send("food")
}

module.exports={createFood}