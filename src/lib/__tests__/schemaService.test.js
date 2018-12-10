const schemaService = require('../../app/services/schemaService');

describe('When using the schemaService', () => {
    // beforeEach(() => {
    //     return 'blah';
    // });

    it('should return a schema by ID', () => {
        const schema = schemaService.getSchemaById('test-string-optional');
        const literalSchema = {
            $schema: 'http://json-schema.org/draft-04/schema',
            id: 'http://localhost:3000/schema/definitions/test-string-optional',
            'x-uri': '/test',
            title: 'JSON Schema String test - optional',
            description: 'This is a String test schema',
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    title: 'First name',
                    errorMessages: {
                        required: 'Enter your first name',
                        pattern: "Your first name doesn't look right. Try again"
                    }
                }
            }
        };
        expect(schema).toEqual(literalSchema);
    });

    it('should return undefined when passed an invalid schema name', () => {
        const schema = schemaService.getSchemaById('this-is-not-a-schema-123456');
        expect(schema).toEqual(undefined);
    });

    it('should return a UI schema by ID', () => {
        const schema = schemaService.getUISchemaById('test-string-optional');
        const literalSchema = {
            firstName: {
                description: 'The first name legally assigned to you'
            }
        };
        expect(schema).toEqual(literalSchema);
    });

    it('should return undefined when passed an invalid UI schema name', () => {
        const schema = schemaService.getUISchemaById('this-is-not-a-ui-schema-123456');
        expect(schema).toEqual(undefined);
    });

    it('should validate form data against a schema', () => {
        const requestBody = {
            'do-you-like-cheese': true
        };
        const response = schemaService.postSchemaById('test-boolean-required', requestBody);
        expect(response).toEqual({ valid: true });
    });
});

// const Ajv = require('ajv');

// const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
// const fs = require('fs');

// describe('validating declaration schema', () => {
//     beforeAll(done => {
//         fs.readFile('schema/definitions/declaration.json', 'utf8', (err, schemaData) => {
//             if (err) {
//                 throw err;
//             }
//             ajv.addSchema(JSON.parse(schemaData), 'declarationSchema');
//             done();
//         });
//     });

//     test('allow: true', () => {
//         const inputJson = {
//             declaration: true
//         };

//         const valid = ajv.validate('declarationSchema', inputJson);
//         expect(valid).toBe(true);
//     });

//     test('allow: false', () => {
//         const inputJson = {
//             declaration: false
//         };

//         const valid = ajv.validate('declarationSchema', inputJson);
//         expect(valid).toBe(true);
//     });

//     test('disallow additional properties', () => {
//         const inputJson = {
//             declaration: true,
//             anotherProperty: 'something'
//         };

//         const valid = ajv.validate('declarationSchema', inputJson);
//         expect(valid).not.toBe(true);
//     });

//     test('declaration is required', () => {
//         const inputJson = {};

//         const valid = ajv.validate('declarationSchema', inputJson);
//         expect(valid).not.toBe(true);
//     });
// });
