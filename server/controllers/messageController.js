const Message =require("../models/messageModel")

const addMessage =async(req,res)=>{
    try {
        const {from,to,message}=req.body;
        const data = await Message.create({
            message:{
                text:message
            },
            users:[
                from,
                to
            ],
            sender:from,
        })
        if (data) {
            return res.status(200).json({message:"Message Added Successfully"}
            )};
            return res.status(400).json({message:"Failed to add message to DB "})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



const getAllMessage =async(req,res)=>{
    try {
        const messages = await  Message.find({
            users:{
                $all:[from,to]
            }
        }).sort({updatedAt: 1})
        const projectMessage = messages.map((msg)=>{
            return{
                fromself:msg.send.toString() === from,
                message: msg.message.text,
            }
        })
        return res.status(200).json(projectMessage)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports = {addMessage,getAllMessage}