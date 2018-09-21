const express = require('express');
const path = require('path');
// const config = require('./src/config/config');
// const app = express();

// const loader = require('speccy/lib/loader');
// const fs = require('fs');

// const speccyOptions = {
//     resolve: true,   // Resolve external references
//     jsonSchema: true, // Treat $ref like JSON Schema and convert to OpenAPI Schema Objects
// };

// loader
//     .loadSpec(`${__dirname}/schema/schema.json`, speccyOptions)
//     .then(spec => {
//         fs.writeFile(`${__dirname}/schema/openapi.json`, JSON.stringify(spec, null, 4), (err) => {
//             if (err) {
//                 throw err;
//             }
//             console.log('JSON Schema successfully converted in to OpenAPI 3.0 format');
//         });
//     });

// module.exports = require('./src/config/express')(app, config);
// // module.exports = require('./exegesis');







module.exports = (app, config) => {

    app.use('/', express.static(path.resolve(__dirname, './public')));

    const routes = require('./src/routes');
    app.use('/api/v1/', routes);


    /**********************************************/
    /** SWAGGER                                  **/
    /**********************************************/

    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require(path.resolve(__dirname, './schema/openapi.json'));
    // const yaml = require('yamljs'); // YAML to JSON.
    //const swaggerDocument = yaml.load(`${config.root}/public/api-description.yaml`);

    app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return app;
};







// // const express = require('express');
// // const glob = require('glob');

// // const favicon = require('serve-favicon');
// // const logger = require('morgan');
// // const cookieParser = require('cookie-parser');
// // const bodyParser = require('body-parser');
// // const compress = require('compression');
// // const methodOverride = require('method-override');
// // const nunjucks = require('nunjucks');
// // const path = require('path');

// module.exports = (app, config) => {
//     const env = process.env.NODE_ENV || 'development';
//     app.locals.ENV = env;
//     app.locals.ENV_DEVELOPMENT = env == 'development';

//     //app.set('views', path.resolve(config.root, './src/views'));
//     app.set('view engine', 'njk');
//     nunjucks.configure(path.resolve(config.root, './src/views'), {
//         autoescape: true,
//         express: app
//     });

//     // app.use(favicon(config.root + '/public/img/favicon.ico'));
//     app.use(logger('dev'));
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }));
//     app.use(cookieParser());
//     app.use(compress());
//     // app.use(express.static(path.join(__dirname, 'public')));
//     app.use(methodOverride());

//     // var controllers = glob.sync(config.root + '/app/controllers/*.js');
//     // controllers.forEach((controller) => {
//     //   require(controller)(app);
//     // });

//     /**********************************************/
//     /** MIDDLEWARE                               **/
//     /**********************************************/

//     // const exegesisExpress = require('exegesis-express');
    
//     // async function exegesisMiddleware() {
//     //     // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
//     //     const options = {
//     //         controllers: path.join(config.root, '/src/controllers'),
//     //         allowMissingControllers: false
//     //     };
    
//     //     // This creates an exgesis middleware, which can be used with express,
//     //     // connect, or even just by itself.
//     //     const exegesisMiddleware = await exegesisExpress.middleware(
//     //         path.join(config.root, '/schema/openapi.json'),
//     //         options
//     //     );
    
//     //     // If you have any body parsers, this should go before them.
//     //     app.use(exegesisMiddleware);
//     //     return app;
//     // }
    
//     // return exegesisMiddleware()
//     // .then((app) => {
        
//         // app.listen(config.port, () => {
//         //     console.log(`Express server listening on port ${config.port}`);
//         // });
//         // return app;
//     // })
//     // .catch(err => {
//         // console.error(err.stack);
//         // process.exit(1);
//     // });

//     /**********************************************/
//     /** SWAGGER                                  **/
//     /**********************************************/

//     // const swaggerUi = require('swagger-ui-express');
//     // const swaggerDocument = require(`${config.root}/schema/openapi.json`);
//     // // const yaml = require('yamljs'); // YAML to JSON.
//     // //const swaggerDocument = yaml.load(`${config.root}/public/api-description.yaml`);

//     // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



//     return app;
// };
