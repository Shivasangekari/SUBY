const express = require("express")
const app = express()
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const vendorRoutes = require("./routes/vendorRoutes")
const bodyParser = require("body-parser")
const PORT = 1914 //SN

dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoDB connected successfully!")
})
.catch((error)=>{
    console.log(error)
})
app.use(bodyParser.json())
app.use("/vendor",vendorRoutes)

app.use("/home",(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

app.listen(PORT,()=>{
    console.log(`Server started and running successfully on port ${PORT}`)
})
