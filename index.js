const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User=require('./models/User')
const productRoutes=require('./routes/productRoutes')

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',productRoutes)

mongoose.connect('mongodb+srv://bhagyashri:Bhagyashri%40123@leadsoft.fuhdihp.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').then(() =>
    console.log('database connected ')

).catch((err) =>
    console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({
                status:true,
                message:'user already exist'
   
            })
        }
        const userObj=new User({fullName,userName,age,password})
         await userObj.save()
         res.json({
             status:true,
             message:'user register sucessfully'

         })
    }
    catch(err){
           res.json({
            status:false,
            message:`Error:${err}`
           })
    }
})


server.post('/login',async(req,res)=>{
    try{
    const {userName,password}=req.body
    const userExist=await User.findOne({userName})
    if(!userExist){
        return res.json({
            status:false,
            message:'user not found'
        })
    

    }
    if(password!==userExist.password){
        return res.json({
            status:false,
            message:'wrong password'
        })

    }
    res.json({
        status:true,
        message:'login successfully'
    })
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })

    }
})

server.listen(8055, () => {
    console.log('server listening on port 8055')
})