function getUser(req, res, next) {
  // console.log("getUser",req.user);
  if(req.user === undefined){
    req.body.user = false;
  }else{
    req.body.user = req.user.username;
  }
  next();
}

module.exports = getUser;