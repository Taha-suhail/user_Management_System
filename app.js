require("dotenv").config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000 || process.env.PORT;
const connectDB = require("./server/config/db");
connectDB();

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(express.urlencoded({extended:true})); // when submitting form we can use the data from it 
app.use(express.json());
app.use(express.static("public"))
app.use(expressLayout);
app.set("layout","./layouts/main")
app.set("view engine",'ejs');
app.use("/",require("./server/routes/customer"))


//handle 404
app.use("/",require("./server/routes/customer"))
app.get("*",(req,res)=>{
    res.status(404).render("404");
})

app.listen(port,()=>{
    console.log(`the port is running at ${port}`);
})