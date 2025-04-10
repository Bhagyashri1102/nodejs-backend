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

router.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        await product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:'product deleted successfully!!'
          })
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

router.put('/update/:id',async(req,res)=>{
    const id=req.params.id
    await product.findByIdAndUpdate(id,req.body,{'new':true})
    try{
       const updated=await product.findByIdAndUpdate(id)
        res.json({
            status:true,
            message:'product updated successfully!!'
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