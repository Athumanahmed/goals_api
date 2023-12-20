
const Goal = require("../models/goalsModel")
const User = require("../models/userModel")
const mongoose = require("mongodb")
// @desc get all goals
// @route GET /api/goals
// @access private
const getGoals = async( req, res) =>{
   const goals = await Goal.find({
    user:req.user.id
   })
  return res.status(200).json({
    count:goals.length,
    data:goals
   })
}

// @desc get goal by text
// @route GET /api/goals/:text
// access private

const getGoal = async(req, res) =>{
    const goal = req.params.id

    if(!goal){
        res.status(404)
        throw new Error("Goal not found")
    }

    const goalFound = await Goal.findById(goal)

    res.status(200).json(goalFound)
}

// @desc create a goal
// @route POST /api/goals/createGoal
// @access private

const createGoal = async(req, res ) =>{
    try {
        if(!req.body.text){
            res.status(404)
            throw new Error("please add a text.")
        }
       
        const newGoal = await Goal.create({
            text:req.body.text,
            user:req.user.id
        })
        res.status(201).json(newGoal)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:error.message
        })
    }
}

// @desc update a goal
// @route PUT /api/goals/updateGoal/:id
// @access private
const updateGoal = async(req, res) =>{

    try {
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(400)
            throw new Error("Goal not found")
        }

            const user = await User.findById(req.user.id)

            // check for user

            if(!user){
                res.status(401).json({message:"User not found"})

            }

            // make sure the login user matches the goal user.
            if(goal.user.toString() !== user.id){
                res.status(401).json({message:"User not authorized"})
            }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , {new:true})

        res.status(200).json(updatedGoal)

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:error.message
        })
    }
}


// @desc delete a goal
// @route DELETE /api/goals/deleteGoal/:id
// @access private
const deletGoal = async(req, res) =>{
    try {
       const goal = await Goal.findByIdAndDelete(req.params.id)
       if(!goal){
        res.status(400)
        throw new Error("Goal not found")
       }

       
       const user = await User.findById(req.user.id)

       // check for user

       if(!user){
           res.status(401).json({message:"User not found"})

       }

       // make sure the login user matches the goal user.
       if(goal.user.toString() !== user.id){
           res.status(401).json({message:"User not authorized"})
       }
       
       res.status(200).json({id: req.params.id,
                message:"Goal Deleted"
    })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:error.message
        })
    }
}

module.exports = {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deletGoal
}