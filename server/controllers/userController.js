const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      message: "Please All fields required",
    });
  }
  try {
    const userCheck = await User.findOne({ username, email });
    if (userCheck) {
      res.status(401).json({ message: "user already exists" });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username: username,
        email: email,
        password: hash,
      }).then((user) => {
        return res
          .status(200)
          .json({ message: "New User Created Successfully", user });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Please All Field Required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    bcrypt.compare(password, user.password).then(function (result) {
      result
        ? res.status(200).json({
            message: "Login successful",
            user,
          })
        : res.status(400).json({ message: "Login not succesful" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const avatharUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Get users

const getUser =async(req,res)=>{
    const {id}=req.params
    try {
        const user = await User.findById(id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


// LogOut User

const logOut =async(req,res)=>{
    try {
      if(!req.params.id){
        return res.staus(400).json({message:"user Id is required"});
      }
      onlineUsers.delete(req.params.id);
      return res.status(200).json({message:"User Logout"})
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
}




module.exports = { registerUser, loginUser, avatharUser,getUser ,logOut};
