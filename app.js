import express from "express";
import mongoose from 'mongoose';
// import MONGO from "dotenv"
import dotenv from "dotenv"
import UserModel from "./models/userSchema.js";
import bcrypt from "bcryptjs";
dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.port || 5000


const URI = process.env.MONGO;

mongoose.connect(URI)
    .then(() => {
        console.log("dbconnected");

    }).catch((error) => {
        console.log("not connected", error);
    })

app.get("/", (req, res) => {
    res.send("server is up")
}
)



app.post("/signup", async (req, res) => {

    res.send("signup api ")

    const body = req.body


    const isExist = await UserModel.findOne({ Email: body.Email })

    if (isExist) {
        return res.json({
            status: false,
            message: "Email already Exist",
            default: null
        })


    }


    const hashPass = await bcrypt.hash(body.password, 10);
    const userObj = {
        ...body,
        password: hashPass
    }


    await UserModel.create(userObj)
    console.log("user signup");

    res.json({
        message: "user created successfully!!"
    })







})

// app.get()





// app.get("/",(req,res)=>{
//     res.send("hello user")
// })





app.listen(port, () => console.log(`runnig on ${port}`)
);



export default app