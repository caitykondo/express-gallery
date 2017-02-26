function getUser(req, res, next) {
  if(req.user === undefined){
    req.body.user = false;
  }else{
    req.body.user = true;
  }
  next();
}

module.exports = getUser;