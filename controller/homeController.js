const BigPromise = require('../middleware/bigPromise')
exports.home = BigPromise(async(req,res)=>{
    res.status(200).json({
     success: true,
     greeeting: "Hello From API",
    });
 });

exports.homeDummy = async(req,res)=>{
    try {
        res.status(200).json({
            success: true,
            greeeting: "this is another dummy api",
           });
    } catch (error) {
        console.log(error);
    }
 };