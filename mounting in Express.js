const express =require("express")
//always then use node instead of nodemon bcz its restart server so update things did not stor anywhere
const app=express();
app.use(express.json()) //post ->json
app.listen(3000);

//whwnever we send data from frontend to backend the data is in request body
let users=[
    {
        id:1,
        username:"Rachit",
    },
    {
        id:2,
        username:"Vansh"
    }
];
const userRoute=express.Router();  //make a mini app for user so make a router of that
//now gave a base url
//base route , router to use
app.use('/users',userRoute);
userRoute
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRoute.route("/:id").get(getUserById)

///////////////////////////////////////////////////////////////////////////////
//now mounting in express for easy readabale using routers for segregations
 function getUser(req,res)
 {
    console.log(req.query);
    res.send(users);
 }

 function postUser(req,res)
 {
    console.log(req.body);  //data which comes form frontend to backend first  come in request body
    users=req.body;
    res.json({
        message:"request go success",
        user:req.body
    })
 }

 function updateUser(req,res)
 {
    console.log(req.body);
    let updateData=req.body;
    for(key in updateData)
    {
        users[key]=updateData[key];
    }
    //users=req.body;
    res.json({
        message:"Update success..",
        user:req.body
    })
 }

 function deleteUser(req,res)
 {
    users={};
    res.json({
        message:"data is deleted now...."
    })
 }

 function getUserById(req,res)
 {
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++)
    {
        if(users[i]['id']==paramId)
        {
            obj=users[i];
        }
    }
    //console.log("id recieved",);
    res.json(
        {
            message:"id is sended..",
            data:obj
        }
    )

 }
