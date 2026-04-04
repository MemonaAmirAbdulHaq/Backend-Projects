import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema=new Schema({
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,    
},
fullName:{
    type:String,
    required:true,
    trim:true,
    index:true
},
avatar:{
    type:String, //cloudinary url
    required:true
},
coverImage:{
    type:String,
},
watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
}],
password:{
    type:String,
    required:[true,'PAssword is required']
},
refreshToken:{
    type:String,
},

},{
    timestamps:true
});
//middleware to hash password before saving user document
userSchema.pre(
    "save",
    async function(next){
        if(!this.isModified("password")){
            return next()
        }
 this.password=bcrypt.hash(this.password,10)
 next()
    }
)

userSchema.methods.isPasswordCorrect=async function (password) {
 return await bcrypt.compare(password,this.password)
}
//method is an object that allows us to define instance methods for our user model. These methods can be called on individual user documents. For example, we can use the isPasswordCorrect method to check if a provided password matches the hashed password stored in the database for a specific user.
userSchema.methods.generateAccessToken=function (){
return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname,
},
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
)
}



//referesh token generate
userSchema.methods.generateRefreshToken=function (){
return jwt.sign({
    _id:this._id,
    
},
process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}
)
}
export const User=mongoose.model("User",userSchema)