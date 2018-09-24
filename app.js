const express = require('express');
const config = require('./src/config/config');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./src/routes/index');

let app = express();
app = require('./src/config/express')(app, config);

/* ******************************************** */
/* * EXPOSE                                   * */
/* ******************************************** */

app.listen(3001, () => {
    console.log(`Base module app listening on port 3001`);
});
