const express =require("express")
//always then use node instead of nodemon bcz its restart server so update things did not stor anywhere
const app=express();
app.use(express.json()) //post ->json
app.listen(3000);

//whwnever we send data from frontend to backend the data is in request body
let users={
    // name:"Rachit",
    // Percentage:90.3,
    // sirname:"Pandey"

};
//get http method which get the users data
app.get('/users',(req,res)=>{    //get-------> data lena ,data fetch krna, data mangna 
    console.log(req.query);
    res.send(users);
});
 //post which send the data to server
app.post('/users',(req,res)=>{     //post------> data send krna aur data dalna
    console.log(req.body);  //data which comes form frontend to backend first  come in request body
    users=req.body;
    res.json({
        message:"request go success",
        user:req.body
    })
})

//update http method for update data
app.patch('/users',(req,res)=>{
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
});

//delete HTTP method --> delete data
app.delete('/users',(req,res)=>{
    users={};
    res.json({
        message:"data is deleted now...."
    })
})


app.get('/users/:username',(req,res)=>{
    console.log("id recieved",req.params.username);
    res.json(
        {
            message:"id is sended..",
            username:req.params.username
        }
    )
})
