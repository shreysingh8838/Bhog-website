// Importing express library
const express = require('express');
const app = express();

// Importing ejs and express-ejs-layouts library
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');

// Setting up the Port
const PORT = process.env.PORT || 3300

app.get('/',(req,res)=>{
    res.render('home');
})
//SET TEMPLATE ENGINE for templating
app.use(expresslayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, ()=>{
    console.log(`The server is started at ${PORT}`);
})