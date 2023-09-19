exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.checkCsrfErr= (err, req, res, next) =>{
 if(err){
    return res.render('error');
 }  
 next();
};


exports.middlewareLocal = (req,res,next) =>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    
    next();
};

exports.loginRequired = (req,res,next) =>{
    if(!req.session.user){
        req.flash('errors', 'Faça login para criar contato');
        req.session.save(() => res.redirect('/')); 
        return;
    }

    next();
}