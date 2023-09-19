const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel');

exports.index = (req,res) => {
    //console.log(req.session.user);
    if(req.session.user) return res.render('logado');
    return  res.render('login');

};

exports.register = async (req, res) => {
    try {
        
    const login = new Login(req.body);
    await  login.register();

    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        
        req.session.save(function() {
           return res.redirect('back');
        });

        return;
    }
   
    req.flash('success', 'Usuario criado com sucesso');
        
        req.session.save(function() {
           return res.redirect('back');
        });

    } catch (e) {
        console.log(e)
       return res.render('error');
    }
}

//

exports.login = async (req, res) => {
    try {
        
    const login = new Login(req.body);
    await  login.login();

    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        
        req.session.save(function() {
           return res.redirect('back');
        });

        return;
    }
   
    req.flash('success', 'Logado com sucesso');

        req.session.user = login.user;
        req.session.save(function() {
           return res.redirect('back');
        });

    } catch (e) {
        console.log(e)
       return res.render('error');
    }
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}