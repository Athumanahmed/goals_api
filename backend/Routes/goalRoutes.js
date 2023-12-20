const express = require("express")
const router = express.Router()

const {getGoals, createGoal, updateGoal, deletGoal, getGoal} = require("../controllers/goalController")

const {protect} = require("../middleware/auth")

router.get("/" , protect , getGoals )

router.get("/:id" , protect , getGoal)

router.post("/createGoal" , protect, createGoal)

router.put("/updateGoal/:id" , protect,  updateGoal)

router.delete("/deleteGoal/:id" ,protect ,  deletGoal)



module.exports = router

