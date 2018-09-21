/*
 * Validation Service
 */

const Ajv = require('ajv');
const moment = require('moment');
// https://github.com/epoberezkin/ajv/commit/daf7d6b7b0a7a43c47741b4f5cf461c17f5a6382
// https://github.com/epoberezkin/ajv/issues/486
// https://github.com/epoberezkin/ajv/issues/472
// https://github.com/epoberezkin/ajv/releases/tag/5.0.0
// https://github.com/epoberezkin/ajv/issues/740
const ajv = new Ajv({
    schemaId: 'id', // draft-04 support requirment.
    allErrors: true,
    jsonPointers: true
}); // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv);
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

function convertTypes(schema, uiSchema, data) {
    const convertedData = data; // submitted form data.
    const dateProperties = {}; // list of properties that are dates.

    // loop through the schema and cache the properties that are dates.
    // dateProperties[{{NAME_OF_PROPERTY}}] = {{SCHEMA_PROPERTY_PROPERTIES}}
    Object.keys(schema.properties).forEach(property => {
        if (
            schema.properties[property].format &&
            schema.properties[property].format === 'date-time'
        ) {
            // create a lookup table of all the properties in the
            // schema that are expecting dates.
            dateProperties[property] = uiSchema[property]['x-date-time-format'];
        }
    });

    // loop through all the POSTed items that we know to be dates.
    Object.keys(dateProperties).forEach(datePropertyKey => {
        let day = convertedData[`${datePropertyKey}-dd`];
        const month = convertedData[`${datePropertyKey}-mm`];
        const year = convertedData[`${datePropertyKey}-yyyy`];
        let formattedDate;

        delete convertedData[`${datePropertyKey}-dd`];
        delete convertedData[`${datePropertyKey}-mm`];
        delete convertedData[`${datePropertyKey}-yyyy`];

        // if day is 'undefined, this means that the property
        // is not present in the submitted form data. So we
        // can assume that the form is asking for month,
        // and year only.
        //
        // entered a month and year only. default the day
        // to the start of the month.
        //
        // user hasn't entered anything.
        // don't add this property to the convertedData so
        // that we simulate a blank field.

        if (day !== '' && month !== '' && year !== '') {
            formattedDate = moment(`${year}-${month}-${day}`).format();
            convertedData[datePropertyKey] = formattedDate;
        } else if (day === undefined && month !== '' && year !== '') {
            day = 1;
            formattedDate = moment(`${year}-${month}-${day}`).format();
            convertedData[datePropertyKey] = formattedDate;
        }
    });

    // loop through the request body and make sure that the
    // data types are correct:
    // update 'true' to true.
    // update 'false' to false.
    // update an integer represented as a string to a true number.
    Object.keys(convertedData).forEach(key => {
        // if the item value is blank (i.e. not entered in the form on
        // the front end) then just remove it from the form data. This will
        // enable AJV to properly validate 'required' fields, because if they
        // are blank (and then removed) AJV will report that the field is not
        // present and correctly report that the non-existant field is required.
        if (convertedData[key] === '') {
            delete convertedData[key];
        }
        if (convertedData[key] === 'true') {
            convertedData[key] = true;
        }

        if (convertedData[key] === 'false') {
            convertedData[key] = false;
        }

        if (
            /^[-]?[0-9]+$/.test(convertedData[key]) // contains only integers (postive and negative). (e.g. '648387', not '43.32', not '01-02-2018') - matches 1 or more characters.
            // && !Number.isNaN(convertedData[key]&& // is a number.
            // && Number.isFinite(Number.parseInt(convertedData[key], 10)) // is a finite number.
        ) {
            convertedData[key] = Number.parseInt(convertedData[key], 10);
        }
    });

    return convertedData;
}

function beautifyErrors(validationErrors, schema) {
    // return validationErrors.reduce((map, obj) => {
    //     map[obj.dataPath.replace('/', '')] = obj.message;
    //     return map;
    // }, {});

    const result = {};
    for (let i = 0; i < validationErrors.length; i += 1) {
        let invalidPropertySchemaPropertyName =
            validationErrors[i].params.missingProperty ||
            validationErrors[i].dataPath.replace('/', '');
        const invalidPropertySchemaProperty = schema.properties[invalidPropertySchemaPropertyName]; // value of the field's schema definition.
        // name of the property in the schema that has been invalidated.
        // it is a JSON pointer, so we need to get the last word after a '/'.
        // i.e. required, minLength, Pattern.
        let invalidProperty = validationErrors[i].schemaPath.split('/');
        invalidProperty = invalidProperty[invalidProperty.length - 1];

        let customErrorMessage;
        try {
            customErrorMessage =
                schema.properties[invalidPropertySchemaPropertyName].errorMessages[invalidProperty];
        } catch (err) {
            customErrorMessage = validationErrors[i].message;
        }
        // add '-yes' to a boolean field name so that the error hyperlink
        // links to a physical field on the page.
        if (invalidPropertySchemaProperty.type === 'boolean') {
            invalidPropertySchemaPropertyName += '-yes';
        }

        result[invalidPropertySchemaPropertyName] = customErrorMessage;
    }

    return result;
}

function validationResponseAgainstSchema(schema, uiSchema, data) {
    const validate = ajv.compile(schema);
    const typesData = convertTypes(schema, uiSchema, data);
    // validate the edited request body against the schema.
    const valid = validate(typesData);

    if (!valid) {
        return beautifyErrors(validate.errors, schema);
    }
    return {
        valid: true
    };
    // var valid = ajv.validate(schema, data);
    // if (!valid) {
    //     console.log(ajv.errors);
    // }
}

module.exports = {
    validationResponseAgainstSchema
};
