// const express = require('express');
// const expressNunjucks = require('express-nunjucks');
// const app = express();
// const path = require('path');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const isDev = app.get('env') === 'development';

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'njk');
// app.set('views', path.join(__dirname, '/views/'));

// const nunjucks = expressNunjucks(app, {
//     watch: isDev,
//     noCache: isDev
// });


// const routes = require('./routes');
// const dashboard = require('dashboard');
// const account = require('account');
// const enquiry = require('enquiry');
// const application = require('application');

// app.use('/', routes);
// app.use('/dashboard', dashboard);
// app.use('/account', account);
// app.use('/enquiry', enquiry);
// app.use('/application', application);

// module.exports = app;