const express =require("express")
//always then use node instead of nodemon bcz its restart server so update things did not stor anywhere
const app=express();
const authRoute=express.Router();
const userModel=require('../models/userModel');
app.use('/auth',authRoute);
authRoute
.route('/login')
.post(LoginUser)

async function postSignup(req,res){
    let dataobj=req.body;
    let obj=await userModel.create(dataobj);
    console.log(obj);
    res.json({
        message:"data go from frontend to backend database..",
        data:obj
    });
}

async function getSignup(req,res){
    let dataobj=await userModel.findOne({email:"def@gmail.com"});
    // let dataobj=await userModel.find();
    console.log(dataobj);
    res.json({
        message:"getting data of user search for that email",
        data:dataobj
    });
}

async function LoginUser(req,res){
    try{
    let data=req.body;
    let user=await userModel.findOne({email:data.email});
    if(user)
    {
        if(user.password==data.password)
        {
            res.json({
                message:"user Login Successfully",
                userDetails:data
            })
        }
        else{
            res.json({
                message:"Wrong Password"
            })
        }
    }
    else{
        return res.json({
            message:"Invalid User Credentials"
        })
    }
}
catch(err){
    res.json({
        message:err.message
    })
}

}
