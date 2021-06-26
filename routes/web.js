const homeController = require('../app/http/Controllers/homeController');
const authController  = require('../app/http/Controllers/authController');
const cartController = require('../app/http/Controllers/customers/cartController');

//middlewares
const guest = require('../app/http/middlewares/guest');

function initRoutes(app){

    app.get('/', homeController().index);
    //auth routes
     app.get('/login', guest, authController().login);
     app.post('/login', authController().postLogin);    
     app.get('/register', guest, authController().register);
     app.post('/register', authController().postRegister);
     app.post('/logout', authController().logout);
    //routes for customers
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);
}
module.exports = initRoutes 