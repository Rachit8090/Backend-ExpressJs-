MVC Architecture stands for Models -> Views -> Controllers
here All the database related works like schema connection and links all that stuffs in Models.
here all the GUI works like frontend works are in views part
All the brain works like function s REST API are control by controllers section
For connection use module.exports
so use module.exports in function itself in controllers eg
module.exports.getUsers=function getUsers(req,res){
} like that
and in main server import this as pairs or singles also eg
const ({...|...|....|...})=require(../controllers/userControllers) like that
->> these dots are represented as all functions which are in controllers...
