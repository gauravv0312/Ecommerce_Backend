const BigPromise = require('../middleware/bigPromise');
const User = require('../model/user');
const cookieToken = require('../utils/cookieToken');
const CustomError = require("../utils/customError");
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');


exports.signup = BigPromise(async(req,res,next)=>{ 

     if(!req.files){
          return next(new CustomError("photo is required for signup",400))
     }
     let file = req.files.photo;

     const result = await cloudinary.v2.uploader.upload(file.tempFilePath);

    const{name,email,password} = req.body;
    if(!name || !email ||!password)
         return next(new CustomError("Name, Email and Password is Required",400));

   
    const user  = await User.create({
         name,
         email,
         password,
         photo:{
          id: result.public_id,
          secure_url: result.secure_url,
         },
    });

    cookieToken(user,res);
})