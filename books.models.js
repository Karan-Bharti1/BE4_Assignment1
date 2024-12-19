const mongoose=require('mongoose')
const BookSchema=new mongoose.Schema({
title:{
    type:String,
    require:true
},
author:{
    type:String,
    require:true
},
publishedYear:{
    type:Number
},genre:[
    {
        type:String
    }
],
language:{
    type:String
},
country:{
    type:String
},
rating:{
    type:Number
},
summary:{
    type:"String"
},
coverImageUrl:{
    type:String
}
},{timestamps:true})
const BooksModel=mongoose.model("BooksModel",BookSchema)
module.exports=BooksModel