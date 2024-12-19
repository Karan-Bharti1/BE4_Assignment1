const {initializerDatabase}=require('./database/db.connection')
initializerDatabase()

const BooksModel=require("./books.models")
const express=require('express')
const app=express()
const PORT=process.env.PORT||3000
const cors=require('cors')
app.use(cors())
app.use(express.json())
async function createBookData(newBook){
    try {
      const book=new BooksModel(newBook)  
      const saveData=await book.save()
      return saveData
    } catch (error) {
        throw error
    }
}
app.post("/books",async(req,res)=>{
    try {
       const book=await createBookData(req.body) 
       if(book){
        res.status(201).json({message:"Book data added successfully",book})
       }
    } catch (error) {
      res.status(500).json({error:"Failed to create new Data"})  
    }
})
app.listen(PORT,()=>{
    console.log("App is running on port ",PORT)
})