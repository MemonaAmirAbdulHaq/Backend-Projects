import mongoose from 'mongoose'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
import app from './app.js'



dotenv.config({
    path:'./env'
})
connectDB()
.then( ()=>{
    app.listen(process.env.PORT || 8000,()=>
        console.log(`Server is running at port:${process.env.PORT}`))
})
.catch((error)=>{
    console.log("Mongo db connection is failed",error)
})















/*(async () =>{
    try {
     await   mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
     //listner in express
     app.on("error",(err)=>{
        console.log("Error in connection")
        throw err
     })
     app.listen(process.env.PORT,()=>{
        console.log(`App is listening to ${process.env.PORT}`)
     })

    } catch (error) {
        console.error("Error",error)
        throw err
    }
})()*/

