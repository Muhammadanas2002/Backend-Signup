import mongoose from "mongoose";

const schema = new mongoose.Schema({

            FullName: String, 
            Email: String,
            password:String,
            phoneNum:String,
            type:{
                        type:String,
                         enum: ["user","admin"],
            } 
                



})


const UserModel = mongoose.model("users",schema)


export default UserModel;