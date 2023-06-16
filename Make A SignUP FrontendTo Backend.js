app.use('/auth',authRoute);
// userRoute
// .route('/')
// .get(getUser)
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser)

// userRoute.route("/:id").get(getUserById)

//////
authRoute
.route('/signup')
.get(getSignup)
.post(postSignup)

function getSignup(req,res)
{
    let obj=req.body;
    res.json({
        message:"get the data",
        data:obj
    })
    //get all the details in the form from backend 
   // res.sendFile('/signup.html',{root:__dirname});
}

function postSignup(req,res)
{
    let dataobj=req.body;
    console.log('backend data',dataobj);
    res.json({
        message:" user signed up..",
        data:dataobj
    })
}


HTML PAGE

<body>
    <form>
        <label>Email</label>
        <input type="email">
        <label>Name</label>
        <input type="text">
        <label>Password</label>
        <input type="password">
        <button>SignUp</button>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> 
    <script>
        let btn=document.querySelector('button');
        btn.addEventListener('click', async function(e){
            e.preventDefault();
            let email=document.querySelector("input[type='email']").value;
            let name=document.querySelector("input[type='text']").value;
            let password=document.querySelector("input[type='password']").value; 
            let resp= await axios.post('/auth/signup',{email,name,password});//store these data in the form of obj
            console.log('resp',resp);
        })
    </script>
</body>
