
const cookieToken = (user,res)=>{
   const token = user.getJwtToken();
   const option  = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
   };
   user.password = undefined;
   res.status(200).cookie("token",token,option).json({
    success: true,
    token,
    user,
   });

   // console.log(user._id);
   // console.log(token);

}

module.exports = cookieToken