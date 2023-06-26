//HOOKS are like Middlewares
const express =require("express")
//always then use node instead of nodemon bcz its restart server so update things did not stor anywhere
const app=express();
const mongoose=require('mongoose');
//app.use(express.json()) //post ->json
app.listen(3000);


app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());
//link of connecting mongodb atlas with our project
const db_link='mongodb+srv://admin:AmRnhAI6MQOnTDJw@cluster0.wnyf5p9.mongodb.net/?retryWrites=true&w=majority';
//connection implemented
mongoose.connect(db_link)
.then(function(db){
    console.log("DB Connected");
})
.catch(function(err){
    console.log(err);
})

//structure of Database
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        // validate:function(){
        //     return emailValidator.validate(this.email);  //this means its validate  that entry is email only else gives error
        // }
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true,
        validate:function(){
            return this.confirmpassword==this.password;  //this validates that value of both are equal else gives error
        }
    }
})
//now we have to tell where it is using so we create models.
//model
const userModel=mongoose.model('userModel',userSchema);
//now put manual creater user into usermodel
//make above function asyn cans immediately invoked...

//whwnever we send data from frontend to backend the data is in request body
//const userRoute=express.Router();  //make a mini app for user so make a router of that
//make a sign up page so we have to make auth router
const authRoute=express.Router();
app.use('/auth',authRoute);
// userRoute
// .route('/')
// .get(getUsers)
// .patch(updateUser)
authRoute
.route('/signup')
.get(getSignup)
.post(postSignup)

//get all users data
// async function getUsers(req,res){
//     let allusers=await userModel.find();
//     console.log(allusers);
//     res.json({
//         message:"getting all data",
//         data:allusers
//     });
// }

// MONGOOSE HOOKS OF SAVE for PRE and POST BOTH
//PRE HOOK
userSchema.pre('save',function(){
    this.Confirmpassword=undefined;
    //here THIS denotes the full SCHEMA.
    console.log("Now befroe saving post req of data to DB not save Confirm pass to it");
});

//post data to server from frontedn to backend
async function postSignup(req,res){
    let dataobj=req.body;
    let obj=await userModel.create(dataobj);
    console.log(obj);
    res.json({
        message:"data go from frontend to backend database..",
        data:obj
    });
}
//POST HOOK
userSchema.post('save',function(){
    //here THIS denotes the full SCHEMA.
    console.log("now after saving details to DB please tell the Name of user");
    console.log(this.name);
})

async function getSignup(req,res){
    let dataobj=await userModel.findOne({email:"def@gmail.com"});
    // let dataobj=await userModel.find();
    console.log(dataobj);
    res.json({
        message:"getting data of user search for that email",
        data:dataobj
    });
}
