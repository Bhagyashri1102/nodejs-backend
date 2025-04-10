const express=require('express')
const router=express.Router()
const product=require('../models/product')

router.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDescription}=req.body
        const productExist=await product.findOne({productName})
        if(productExist){
             return res.json({
                status:false,
                message:'product already exist'
             })
        }
        const productObj=new product({ productName,productPrice,productUnit,productDescription })
        await productObj.save()
        res.json({
            status:true,
            message:'product added successfully'
        })
    }

    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

router.get('/get',async(req,res)=>{
    try{
      const results=await product.find()
      res.json({
        status:true,
        message:results
      })
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})
module.exports=router