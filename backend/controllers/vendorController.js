const Vendor = require("../models/Vendor")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotEnv = require("dotenv")

dotEnv.config()

const secretKey = process.env.Key

const vendorRegister = async(req,res)=>{
    const {username,email,password} = req.body
    try{
       const vendorEmail = await Vendor.findOne({email})
       if(vendorEmail){
        return res.status(400).json({message:"Email already taken"})
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const newVendor = new Vendor({
        username,
        email,
        password:hashedPassword
       })
       await newVendor.save()
       res.status(201).json({message:"Vendor registered successfully"})
       console.log("Registered")
    }
    catch(error){
        res.status(500).json({error:"Internal server error"})
        console.error(error)
    }
}

const vendorLogin = async (req,res) => {
    const {email,password} = req.body
    try {
        const vendor = Vendor.findOne({email})
        if(!vendor || !(bcrypt.compare(password,Vendor.password))){
            return res.status(401).json({error:"Invalid Username or Password"})
        }
         const token = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:"1h"})
          res.status(200).json({Success:"Login Successful"})
          console.log(email,token)
    } catch (error) {
         console.log(error);
    }
}

module.exports = {vendorRegister,vendorLogin}