const User=require("../models/user");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User Signout successfully"
    })
   
}

exports.signup=(req,res)=>{

    const errors=validationResult(req);
    console.log(errors.errors[0]);

    if(!errors.isEmpty())
    {
        console.log(errors.array()[0].msg);
        return res.status(422).json({
            error:"err"
        })
    }

    const user= new User(req.body);
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Not able to save User in DB"
            });
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    });
}

exports.signin=(req,res)=>{
    const {email,encry_password}=req.body;
   

    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        console.log(errors.array()[0].msg);
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err||!user)
        {
           return  res.status(400).json({
                error:"User Email doesn't exists"
            });
        }

        if(!user.authenticate(encry_password)){
            console.log(user.authenticate(encry_password));
           return  res.status(400).json({
                error:"Email and password do not match"
            });
        }

        // CREATE TOKRN
        const token=jwt.sign({_id:user._id},process.env.SECRET);
        //PUTTING TOKEN IN COOKIE
        res.cookie("token",token,{expire:new Date() +999});
        //send res to frontend
        const {_id,name,email,role}=user;
        return res.json({
            token,
            user:{
                _id,name,email,role
            }
        });
    });

}


//protected routes
exports.isSignedIn= expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})


//custom middlewares
exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role==0)
    {
        res.status(403).json({
            error:"Your not Admin, Access Denied"
        });
    }
    next();
}