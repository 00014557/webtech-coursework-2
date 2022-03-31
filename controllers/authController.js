const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
  res.render('authPage/login', {
    titleName: 'Login'
  });
};

exports.postLogin = async(req, res, next) => {
   try {
    const {email,password} = req.body; 
    const user = await User.findOne({email})
    if(!user){
      return res.redirect('/login');
    }

    const matchedPassword = await bcrypt.compare(password, user.password)
    if(matchedPassword){
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(err => {
        res.redirect('/');
      });
     }
   } catch (error) {
      console.log(error);
      res.redirect('/login');
   }
}


exports.getRegister = (req, res, next) => {
    res.render('authPage/signup', {
      titleName: 'Sign Up'
    });
};


 
 exports.postRegister = async (req, res, next) => {
   try {
    const {email,password,passwordRepeat,name,surname,age} = req.body;
    const user = await User.findOne({email})
     if(user){
       return res.redirect('/register');
     }
     if(password!==passwordRepeat){
       return res.redirect('/register');
     }
     const encryptedPassword = await bcrypt.hash(password,12)
     const newUser = new User({
        email,
        password:encryptedPassword,
        name,
        surname,
        age,
        posts:[]
      });

      await newUser.save();
     return  res.redirect('/login');
   } catch (error) {
     console.log(error);
     return res.redirect('/register');
   }
 };
 

 exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};