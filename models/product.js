const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
   productName:{type:String,required:true,unique:true},
   productPrice:{type:Number,required:true},
   productUnit:{type:String,required:true},
   productDescription:{type:string,required:true}
})

module.exports=mongoose.model('product',productSchema)