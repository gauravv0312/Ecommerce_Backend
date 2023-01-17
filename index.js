const app = require('./app');
const connectWithDb = require('./config/db');
require('dotenv').config();
const cloudinary = require('cloudinary');

// Connection with db
connectWithDb(); 

// cloudinary config goes here
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}.........`);
})