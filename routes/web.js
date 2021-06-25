const homeController = require('../app/http/homeController');
const authController  = require('../app/http/authController');
const cartController = require('../app/http/customers/cartController');

function initRoutes(app){

    app.get('/', homeController().index);
    //auth routes
    app.get('/login', authController().login);
    app.get('/register', authController().register);
    
    //routes for customers
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);
}
module.exports = initRoutes 