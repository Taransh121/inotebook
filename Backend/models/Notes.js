const mongoose=require("mongoose");
const {Schema}=mongoose;

//Creating a schema
const NotesSchema=new Schema({
    user:{         //Noiw this is linking notes to its appropriate owner or user.
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("notes",NotesSchema)