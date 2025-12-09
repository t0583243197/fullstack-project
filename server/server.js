require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const connectDB=require("./config/connectDB")
const corsOptions=require("./config/corsOptions")
const mongoose = require("mongoose")

const PORT =process.env.PORT||1000

connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/auth",require('./routes/authRout'))
app.use("/api/product",require("./routes/productRout"))
app.use("/api/basket",require("./routes/basketRout"))


mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB")
    app.listen(PORT,()=>console.log(PORT))
})
mongoose.connection.on('error',err=>{
    console.log(err);
}
)
