//first go to mongodb atlas create a project and do some changes in security in netwroking and database accesss and then do these thigs
//first get a link from atlas then make a connection by mongoose then make schema then make model then either make user manulally
//or through take data from server and go async ly 

const express =require("express")
//always then use node instead of nodemon bcz its restart server so update things did not stor anywhere
const app=express();
const mongoose=require('mongoose');
//app.use(express.json()) //post ->json
app.listen(3000);
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
    },
    password:{
        type:String,
        required:true
    }
})
//now we have to tell where it is using so we create models.
//model
const userModel=mongoose.model('userModel',userSchema);
(async function createUser(){
    let user={
        name:'rachit',
        email:'abx@gmail.com',
        password:'12345'
    };
    let data= await userModel.create(user);
    console.log(data);
})();
//now put manual creater user into usermodel
//make above function asyn cans immediately invoked...
