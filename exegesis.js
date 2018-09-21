const express = require('express');
const app = express();
const exegesisExpress = require('exegesis-express');
// const http = require('http');
const path = require('path');

async function createServer() {
    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
    const options = {
        controllers: path.resolve(__dirname, './src/controllers'),
        allowMissingControllers: false
    };

    // This creates an exgesis middleware, which can be used with express,
    // connect, or even just by itself.
    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './schema/openapi.json'),
        options
    );

    /**********************************************/
    /** SWAGGER                                  **/
    /**********************************************/

    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./schema/openapi.json');
    // const yaml = require('yamljs'); // YAML to JSON.
    //const swaggerDocument = yaml.load(`${config.root}/public/api-description.yaml`);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    // If you have any body parsers, this should go before them.
    app.use(exegesisMiddleware);

    // Return a 404
    app.use((req, res) => {
        res.status(404).json({message: `Not found`});
    });

    // Handle any unexpected errors
    app.use((err, req, res, next) => {
        res.status(500).json({message: `Internal error: ${err.message}`});
    });

    // const server = http.createServer(app);
    // return server;
    return app;
}

createServer()
    .then(app => {
        console.log("API Module running!");
        return app;
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

module.exports = app;