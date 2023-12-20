const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const app = express()
const PORT = process.env.PORT 


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/api/goals" , require("./Routes/goalRoutes"))
app.use("/api/users" , require("./Routes/userRoutes"))
app.use(errorHandler)
app.listen(PORT , () =>{
    connectDB()
    console.log(`SERVER STARTED ON PORT ${PORT}..`.cyan)
})
