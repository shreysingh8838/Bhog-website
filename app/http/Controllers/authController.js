const User = require('../../models/user')
const passport = require("passport")
const local = require('passport-local')
const bcrypt = require('bcrypt')
function authController(){
    
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customers/orders'
    }

    return{
        login(req, res){
            res.render('auth/login');
        },
        postLogin(req, res, next){
            const { email, password } = req.body
            //Validate request
            if(!email || !password){
                req.flash('error', 'All fields are required')
                return res.redirect("/login")
            }
 
            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    console.log("User is logged in")
                    
                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req, res){
            res.render('auth/register');
        },
        async postRegister(req, res){
            const { name, email, password } = req.body
            
            //Validate request
            if(!name || !email || !password){
                req.flash('error', 'All fields are required')
                req.flash('error',name)
                req.flash('error', email)
                return res.redirect("/register")
            }

            //check if email exists
            User.exists({email:email},(err, result)=>{
                if(result){
                    req.flash('error','Email already')
                    req.flash('error',name)
                    req.flash('error', email)
                    return res.redirect("/register")
                }
            })

            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10)

            //Create a User 
            const user = new User({
                name : name ,
                email : email,
                password : hashedPassword 

            })
        
            user.save().then((user)=>{
                //login
                console.log("User is Registered")
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error', 'Something went wrong')
                console.log("User is not Registered")
                return res.redirect('/register')
            })

            console.log(req.body)
        },
        logout(req, res){
            req.logout()
            console.log('User is logged out')
            return res.redirect('/login')

        }
        
    }
}


module.exports = authController;