const mongoose=require("mongoose");
const {Schema}=mongoose;

//Creating a schema
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


//Ab hum upar banaye schema se ek module banayenge
// module.exports=mongoose.model("Module ka naam",Schema)
module.exports=mongoose.model("user",UserSchema)