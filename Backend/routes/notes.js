const express=require("express");
const router=express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.

router.get("/",(req,res)=>{
    res.json([])
})

module.exports=router;
