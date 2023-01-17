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
});

exports.login = BigPromise(async(req,res,next)=>{
      const {email,password} = req.body;

     //  check for email and password

     if(!email || !password)
         return next(new CustomError("please provide email and password",400));

     // get user from db
     const user  = await User.findOne({email}).select("+password");
//  if user not found in db
     if(!user)
           return new CustomError("Email or password does not match or exist",400);

     // match the password 
     const isPasswordCorrect = await user.isValidatedPassword(password);

     // if passsword doesnot match
     if(!isPasswordCorrect)
           return next(new CustomError('Email or password does not match or exist',400));


     cookieToken(user,res);

});

exports.logout = BigPromise(async(req,res,next)=>{
    res.cookie("token",null,{
     expires : new Date(Date.now()),
     httpOnly: true,
    });

    res.status(200).json({
     success: true,
     message: "Logout Successfully",
    });
});
