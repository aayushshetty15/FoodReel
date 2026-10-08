const express = require('express')
const foodController =  require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')
const uploadFile = multer({
    storage:multer.memoryStorage(),
})

const router = express.Router();


router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    uploadFile.single("video"),
    foodController.createFood)

module.exports = router;