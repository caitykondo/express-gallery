function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }else{
    console.log('not authenticated');
    res.redirect('/login');
  }
}
module.exports = isAuthenticated;