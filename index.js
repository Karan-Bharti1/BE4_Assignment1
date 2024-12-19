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
async function readAllBooks(){
    try {
        const books= await BooksModel.find()
return books
    } catch (error) {
        throw error
    }
}
app.get("/books",async(req,res)=>{
    try {
     const books=await readAllBooks() 
     if(books.length!=0){
        res.status(201).json(books)
     }  else{
        res.status(404).json({error:"Book Data Not Found"})
     }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch books data."})
    }
})
async function readByTitle(titleName) {
    try {
        const book=await BooksModel.findOne({title:titleName})
        return book
    } catch (error) {
        throw error
    }
}
app.get("/books/:bookTitle",async(req,res)=>{
    try {
        const book=await readByTitle(req.params.bookTitle)
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({error:"Book Not Found"})
        }
    } catch (error) {
       res.status(500).json({error:"Failed to fetch the data"}) 
    }
})
async function readBooksByAuthor(authorName){
    try {
      const books=await BooksModel.find({author:authorName})  
      return books
    } catch (error) {
        throw error
    }
}
app.get("/books/author/:authorName",async(req,res)=>{
    try {
    const books=await readBooksByAuthor(req.params.authorName) 
    if(books.length!=0){
        res.status(201).json(books)
    }   else{
        res.status.json(404).json({error:"Books data not found."})
    }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the data"}) 
    }
})
async function readAllBooksByGenre(genreName) {
    try {
        const books=await BooksModel.find({genre:genreName})
        return books
    } catch (error) {
        throw error
    }
}
app.get("/books/genre/:genreName",async(req,res)=>{
    try {
        const books=await readAllBooksByGenre(req.params.genreName)
        if(books.length!=0){
            res.status(201).json(books)
        }else{
            res.status(404).json({error:"Books not found."})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data "})
    }
})
app.listen(PORT,()=>{
    console.log("App is running on port ",PORT)
})