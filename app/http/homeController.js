const Menu = require('../models/menu')
function homeController(){
    return{
        async index(req, res){
            const items = await Menu.find()
            return res.render('home', {items : items})
            
            // it is about without using async and await function
            // Menu.find().then(function(items){
            //     return res.render('home',{ items: items })
            // })
            
        } 
    }
    
}

module.exports = homeController;