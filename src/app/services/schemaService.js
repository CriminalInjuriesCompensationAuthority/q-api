/*
 * Schema Service
 */

const path = require('path');
// const validationService = require('../services/validationService');
const validator = require('q-validator');
const fs = require('fs');

function getSchemaById(schemaId) {
    const schemaDirPath = path.resolve(__dirname, '../../schema/definitions/');
    const schemaPath = path.resolve(schemaDirPath, `${schemaId}.json`);
    let schema;

    // fs is preferred over require.
    // const schema = require(schemaPath);
    if (fs.existsSync(schemaPath)) {
        schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        return schema;
    }

    return undefined;
}

function getUISchemaById(schemaId) {
    const schemaDirPath = path.resolve(__dirname, '../../schema/definitions-ui/');
    const schemaPath = path.resolve(schemaDirPath, `${schemaId}.json`);
    let schema;

    // fs is preferred over require.
    // const schema = require(schemaPath);
    if (fs.existsSync(schemaPath)) {
        schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        return schema;
    }

    return undefined;
}

function postSchemaById(schemaId, requestBody) {
    const schema = getSchemaById(schemaId);
    const uiSchema = getUISchemaById(schemaId);
    const validationResult = validator().validationResponseAgainstSchema(
        schema,
        uiSchema,
        requestBody
    );

    return validationResult;
}

module.exports = {
    getSchemaById,
    postSchemaById,

    getUISchemaById
};
