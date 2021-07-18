const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MenuSchema = new Schema({
    name : {type : String, required : true},
    image : {type : String, required : true},   
    price : {type : Number, required : true},
    size : {type : String, required : true},
    description : {type : String, required : true}
})


const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;