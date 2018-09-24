const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const path = require('path');

module.exports = (app, config) => {
    const env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    //app.set('views', path.resolve(config.root, './src/views'));
    app.set('view engine', 'njk');
    nunjucks.configure(path.resolve(config.root, './src/views'), {
        autoescape: true,
        express: app
    });

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(methodOverride());

    /**********************************************/
    /** SWAGGER                                  **/
    /**********************************************/

    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require(`${config.root}/schema/openapi.json`);
    // const yaml = require('yamljs'); // YAML to JSON.
    //const swaggerDocument = yaml.load(`${config.root}/public/api-description.yaml`);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /**********************************************/
    /** ROUTING                                  **/
    /**********************************************/

    const routesApi = require('../routes');
    app.use('/api/v1/', routesApi);

    // const routes = require('../routes/');
    // app.use('/', routes);

    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // if (app.get('env') === 'development') {
    //     app.use((err, req, res, next) => {
    //         res.status(err.status || 500);
    //         res.render('error', {
    //             message: err.message,
    //             error: err,
    //             title: 'error'
    //         });
    //     });
    // }

    // app.use((err, req, res, next) => {
    //     res.status(err.status || 500);
    //     res.render('error', {
    //         message: err.message,
    //         error: {},
    //         title: 'error'
    //     });
    // });

    return app;
};
