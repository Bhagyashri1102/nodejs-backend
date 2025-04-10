const express=require('express')
const router=require('../models/product')
const product=require('../models/product')
router.post('/add',async(requestAnimationFrame,res)=>{
    try{
        const {productName,productPrice,productunit,productDescription}=req.body
        const productExist=await product.findOne({productName})
        if(productExist){
             return res.json({
                status:false,
                message:'product already exist'
             })
        }
        const productObj=new product({ productName,productPrice,productunit,productDescription })
        await productPrice.save()
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

routes.get('/get',async(req,res)=>{
    try{
      const results=await product.findOne()
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