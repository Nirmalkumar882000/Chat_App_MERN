const { default: mongoose } = require("mongoose");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:20,
        min:3
    },
    email:{
        type:String,
        required:true,
        max:50,
        min:3,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:4
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    }

})


const User = mongoose.model("User",userSchema);


module.exports =User;