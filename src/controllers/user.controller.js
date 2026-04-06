import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser=asyncHandler(
    async(req,res)=>{
     //get user detail from frontend
     //validation- not empty
     //chk if user already exist:username or email
     //check for images avatar
    //upload them to cloudinary,avatar chk
    //create user object and save to db-create entry in db
    //remove password & referesh token from response
    //user for user creation
    //return response to frontend
   const {fullName,email,username,password}=req.body;
   console.log("email" , email);

//    if(fullName===""){
//     throw new ApiError(400,"Full name is required")
//    }
//you can use map as well

  if([fullName,email,username,password].some((field)=>field?.trim()===""))
    {
  throw new ApiError(400,"All fields are required")
  }
   const existedUser=  User.findOne({
      $or:[{username} ,{email}]
     })
     if(existedUser){
      throw new ApiError(409,"User already exist with this username or email")
     }
     const avatarLocalPath=req.files?.avatar[0]?.path;
     const coverImageLocalPath=req.files?.coverImage[0]?.path;
     
     if(!avatarLocalPath){
       throw new ApiError(400,"Avatar image is required")
     }
     const avatar =await uploadOnCloudinary(avatarLocalPath);
     const coverImage= await uploadOnCloudinary(coverImageLocalPath);
  if(!avatar){
       throw new ApiError(400,"Avatar image is required")

  }

   const user=await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase()
     })
     const createdUser=await User.findById(user._id).select("-password -refreshToken")
     if(!createdUser){
      throw new ApiError(500,"Failed to create user")
     }
     return res.status(201).json(
      new ApiResponse(200,createdUser,"User created successfully")
    )}
)

export {registerUser}