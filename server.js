require('dotenv').config()

// Importing express library
const express = require('express');
const app = express();

// Importing ejs and express-ejs-layouts library
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');

// Setting up the Port
const PORT = process.env.PORT || 3300


// Importing mongoose library
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log("Database is not connected");
})


// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// middleware
app.use(flash())
// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


//ASSETS for serving the static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

// to make the express understand the response is came into JSON
app.use(express.json())

//SET TEMPLATE ENGINE for templating
app.use(expresslayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


require('./routes/web')(app);

app.listen(PORT, ()=>{
    console.log(`The server is started at ${PORT}`);
})