const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Pleae add a name']
    },
    email:{
        type:String,
        required:[true, 'please add an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please add apassword']
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)