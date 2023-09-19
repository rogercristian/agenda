require('dotenv').config();

const express = require('express');
const app = express();

// connection bd
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    console.log('ocorreu agora');
    app.emit('pronto');
})
.catch(e => console.log(e));

const sessions = require('express-session');
const MongoSession = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet');
const csrf = require('csurf');

const {checkCsrfErr, csrfMiddleware, middlewareLocal} = require('./src/middlewares/middlewares');

// app.use(helmet());
app.use(express.urlencoded({ extends: true }));
app.use(express.static(path.resolve(__dirname,'public')));

const sessionOptions = new sessions({
    secret: 'pode ser qualquer coisa aqui',
    store: MongoSession.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

//middlewares
app.use(checkCsrfErr);
app.use(csrfMiddleware);
app.use(middlewareLocal);

//rotas
app.use(routes);



app.on('pronto',()=>{
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    });
})

