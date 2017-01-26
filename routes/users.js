var express = require('express');
var router = express.Router();
var multer=require('multer');
var flash = require('connect-flash');
var upload=multer({dest: 'public/uploads/'});
var user=require('../models/user');

var passport=require('passport');
router.usernm='';

var LocalStrategy=require('passport-local').Strategy;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/quiz', function(req, res, next) {
  res.render('categories',{ name:username1});
  
});
router.get('/quiz/simple', function(req, res, next) {
  res.render('questionssimple',{ name:username1});
  
});
router.get('/quiz/results', function(req, res, next) {
  res.render('results',{ name:username1});
  
});
router.get('/quiz/medium', function(req, res, next) {
  res.render('questionmedium',{ name:username1});
  
});
router.get('/quiz/hard', function(req, res, next) {
  res.render('questionhard',{ name:username1});
  });
router.get('/register', function(req, res, next) {
  res.render('register',{title:'register'});

});
router.post('/register',upload.single('profileimage'), function(req, res, next) {
 var name=req.body.name;
  var email=req.body.email;
   var username=req.body.username;
    var password=req.body.password;
     var password2=req.body.password2;
     console.log(req.file);
     if(req.file){
         console.log("uploading file");
       var profileimage=req.file.filename;
     }
     
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('username','username field is required').notEmpty();
  req.checkBody('email','email field is required').notEmpty();
  req.checkBody('email','Email not valid').isEmail();
  req.checkBody('password','password field is required').notEmpty();
  req.checkBody('password2','Password not matched').equals(req.body.password);
var errors=req.validationErrors();
var t=errors.length;
var checkuser=function(username) {
  
    user.getuserbyusername( username, function (err, User) {
    
      
      if (User) { 
        
       usernamefound=1;
       
    } });
    
}(username);
var checkemail=function(username) {
  
    user.getuserbyemail( email, function (err, User) {
    
      
      if (User) { 
        
       emailfound=1;
       
    } });
    
}(email);

setTimeout(checkerror,500);
function checkerror(){
  if(usernamefound){
       
        errors[t]={ msg:"Username already Used"};
        usernamefound=0;
       t++; 
        
}
if(emailfound){
       
        errors[t]={ msg:"email already Used"};
        emailfound=0;
        t++;
        
}
if(errors){ 
  
  res.render('register',{ error: errors});
}
if(!errors){
  var newuser=new user(
    {
    name:name,
    email:email,
    username:username,
    password:password,
    profileimage:profileimage
  });
  user.createuser(newuser,function(err,user){
    if(err) throw err;
    console.log(user);
  });
  req.flash('success','you successfully registered ')
  res.location('/');
  res.redirect('/');
  
}}
});
router.get('/login', function(req, res, next) {
  console.log(usernamefound);
  
  res.render('login',{title:'login'});
});
router.post('/login',
  passport.authenticate('local', {  failureRedirect: '/users/login', failureFlash: 'Invalid username or password' }),
                               function(req,res){
                                      use=1;
                                     req.flash('success','You are now logged in');
                                     res.redirect('/');
                                     
                                   });

   passport.serializeUser(function(User, done) {
     
  done(null, User.id);
});

passport.deserializeUser(function(id, done) {
  user.getuserbyid(id, function(err, User) {
    
    done(err, User);
  });
});                                
passport.use(new LocalStrategy(
  function(username, password, done) {
    user.getuserbyusername( username, function (err, User) {
    
      if (err) { throw err; }
      if (!User) {
        
        return done(null, false, { message: 'Incorrect username.' });
      }
      username1=User.username;     
      user.comparepassword(password,User.password,function(err,isMatch){
    router.usernm=User;
        if(err) return done(err);
        if(isMatch){
          return done(null,User);
        }else{
          return done(null,false,{message:'Invalid Password'});
        }
      });
    });
  }
));                                   
router.get('/logout',function(req,res){
 use=0;
 router.usernm='';
  req.logout();
  req.flash('success','You are now logged out');
  res.redirect('/');
})

module.exports = router;
