userRoute
.route('/forgetpassword')
.post(forgetpassword)

userRoute
.route('/resetpassword/:token')
.post(resetpassword)

module.exports.forgetpassword=async function  forgetpassword(req,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        //now we have to give  a reset link to this email so we have to generate token 
        if(user){
        const resetToken=user.createResetToken();  //user full document .resetToken
        //now we have reset Token now make link of reset password
        //link lokks like : http://abc.com/resetpassword/resetToken
        let resetpassLink=`${req.protocol}://${req.get('host')}/resetpassword/${req. resetToken}`;
        }
        //send mail to user using nodemailer
        else{
            return req.json({
                message:"user not found..please signup.."
            })
        }


    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}

module.exports.resetpassword=async function resetpassword(req,res){
    try{
    const token=req.params.token;
    let {password}=req.body;
    let {confirmPassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    // resetpassword handler will update user password in DB
    if(user){
    user.resetpasswordHandler(password,confirmPassword);
    await user.save();
    res.json({
        message:"Password reset successfully",
    })
}
else{
    res.json({
        message:"user not found"
    })
}
}
catch(err){
    res.json({
        message:err.message
    })
}
}
