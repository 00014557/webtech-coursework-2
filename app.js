const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const UserModel = require('./models/userModel')

const store = new MongoDBStore({
    uri: "mongodb+srv://00014557:webtech@cluster0.j8chw.mongodb.net/webtech",
    collection: 'sessions'
});


const protectedRoute = require('./routes/protectedRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const {getError} = require("./controllers/errorController")



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: 'webtech_secret_key_generated_00014557',
      resave: false,
      saveUninitialized: false,
      store: store
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    UserModel.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        throw new Error(err);
      });
  });


  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });
  
  

app.use(protectedRoute);
app.use(userRoute);
app.use(postRoute);


app.use(getError)

mongoose
  .connect('mongodb+srv://00014557:webtech@cluster0.j8chw.mongodb.net/webtech')
  .then(result => {
    app.listen(port);
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err);
});

