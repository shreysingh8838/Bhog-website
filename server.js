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

// Passport library
const passport = require('passport')

const Emitter = require('events')


// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log("Database is not connected");
})


// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

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


// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())




//ASSETS for serving the static files
app.use(express.static('public'));
// URL encoded data are received from forms. So, to make express understand the response we use this middleware
app.use(express.urlencoded({extended: false}))
// to make the express understand the response is came into JSON
app.use(express.json())



// middleware
app.use(flash())
// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


//SET TEMPLATE ENGINE for templating
app.use(expresslayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


require('./routes/web')(app);


const server = app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})
