const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

/* ******************************************** */
/* ** SWAGGER                                ** */
/* ******************************************** */

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./schema/openapi.json');
// const yaml = require('yamljs'); // YAML to JSON.
// const swaggerDocument = yaml.load(`${config.root}/public/api-description.yaml`);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

/* ******************************************** */
/* ** ROUTING                                ** */
/* ******************************************** */

const routesApi = require('./src/routes');

app.use('/api/v1/', routesApi);

// const routes = require('../routes/');
// app.use('/', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* ******************************************** */
/* ** EXPOSE                                 ** */
/* ******************************************** */

const port = 3001;
app.listen(port, () => {
    console.log(`Base module app listening on port ${port}`);
});
