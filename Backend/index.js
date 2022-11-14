const connectToMongo=require("./db");
const express=require("express");
connectToMongo();

const app=express();
const port=3000;

//If we want to use req.body then we will have to use a middleware aur middleware use krne ke liye we use 'app.use'.
app.use(express.json())

//Available routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))

app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})