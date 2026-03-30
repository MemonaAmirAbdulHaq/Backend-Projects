import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors({
    origin:"process.env.CORS_ORIGIN",
    credentials:true
}));
//the below line means that you accept the json data
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
export default app;