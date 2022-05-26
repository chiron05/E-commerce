require('dotenv').config()

const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');

//Routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const orderRoutes=require("./routes/order");

const mongoose=require('mongoose');

//DB connections
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`DB CONNECTED`);
}).catch((err)=>{
    console.log(`DB NOT CONNECTED`);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//my routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);

//starting a server
app.listen(port,()=>{

    console.log(`app is running at ${port}`);
});