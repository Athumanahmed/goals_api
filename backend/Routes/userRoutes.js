const express = require('express')
const {getAllUsers , getMe , registerUser ,loginUser} = require("../controllers/userContoller")
const router = express.Router()
const {protect} = require("../middleware/auth")

router.get("/all" , getAllUsers)
router.get("/me",protect , getMe)
router.post("/register" , registerUser )
router.post("/login", loginUser)

module.exports =router