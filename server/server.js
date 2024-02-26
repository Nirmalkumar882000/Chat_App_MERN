const express = require("express");
const app = express();
const path = require("path");
const PORT =5000;
const mongoose  = require("mongoose");
const MONGO_URL ="mongodb://localhost:27017/Chat_App"
const userRoute =require("./routes/userRoutes")
const messageRoute =require("./routes/messageRoute")
const socket = require("socket.io");
const cors  = require("cors");




// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());




// Routers

app.use("/api/users",userRoute);
app.use("/api/users",messageRoute);







// DataBAse connection


mongoose.connect(MONGO_URL)
.then(
    console.log(`DataBase Connected on PORT  ${PORT}`)
)
.catch((error)=>{
    console.log(error.message)
})

const server = app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`);
});


// Socket Connection

const io =socket(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials: true,
    },
})

// Store all online users inside this mapreq.accepts


global.onlineUsers =new Map();

io.on("connection",(socket)=>{
    global.chatsocket =socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket =onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-received",data.message)
        }
    })
})

