const express  = require('express');
const app =express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser');


require("dotenv").config();

const routes=require('./routes/index');
const  mongoose  = require('mongoose');

mongoose.connect(process.env.db_connection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})

app.use(cookieParser());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-with,Content-Type,Accept,Authorization');
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/api',routes);


app.use((req,res,next)=>{
    const error = new Error('not fount');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports=app;