import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';

import passport from './passport';

import routes from './routes';
import models from '../models';

const app = express();

// load models to use
app.locals.models = models;

app.use(morgan('dev'));

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sessionStore = new SequelizeStore({
    db: models.sequelize
});
sessionStore.sync();
app.use(session({
    secret: 'Shhhhh!',
    store: sessionStore,
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
    app.use(require('./webpack-middleware'));
}

app.use(routes);

export default app;