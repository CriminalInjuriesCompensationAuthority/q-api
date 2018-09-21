const questionnaireService = require('../../src/services/questionnaireService');

describe('When using the questionnaireService', () => {
    // beforeEach(() => {
    //     return 'blah';
    // });

    it('should return a questionnaire schema by ID', () => {
        const schema = questionnaireService.getQuestionnaireById('test');
        const literalSchema = {
            $schema: 'http://json-schema.org/draft-04/schema#',
            id: 'http://localhost:3000/schema/questionnaires/test',
            'x-uri': 'test-q',
            'x-instanceId': 'test123',
            type: 'object',
            required: ['pages'],
            additionalProperties: false,
            properties: {
                pages: {
                    type: 'array',
                    additionalItems: false,
                    minItems: 7,
                    maxItems: 7,
                    items: [
                        {
                            $ref: '../definitions/test-string-optional.json'
                        },
                        {
                            $ref: '../definitions/test-string-required.json'
                        },
                        {
                            $ref: '../definitions/test-integer-optional.json'
                        },
                        {
                            $ref: '../definitions/test-integer-required.json'
                        },
                        {
                            $ref: '../definitions/test-date-time-optional.json'
                        },
                        {
                            $ref: '../definitions/test-date-time-required.json'
                        },
                        {
                            $ref: '../definitions/test-boolean-optional.json'
                        },
                        {
                            $ref: '../definitions/test-boolean-required.json'
                        }
                    ]
                }
            }
        };
        expect(schema).toEqual(literalSchema);
    });

    it('should return undefined when passed an invalid questionnaire name', () => {
        const schema = questionnaireService.getQuestionnaireById('this-is-not-a-questionnaire-123');
        expect(schema).toEqual(false);
    });

    it('should return a questionnaire schema pages by ID', () => {
        const schema = questionnaireService.getQuestionnairePagesByQuestionnaireId('test');
        const literalPagesSchema = [
            {
                $ref: '../definitions/test-string-optional.json'
            },
            {
                $ref: '../definitions/test-string-required.json'
            },
            {
                $ref: '../definitions/test-integer-optional.json'
            },
            {
                $ref: '../definitions/test-integer-required.json'
            },
            {
                $ref: '../definitions/test-date-time-optional.json'
            },
            {
                $ref: '../definitions/test-date-time-required.json'
            },
            {
                $ref: '../definitions/test-boolean-optional.json'
            },
            {
                $ref: '../definitions/test-boolean-required.json'
            }
        ];
        expect(schema).toEqual(literalPagesSchema);
    });

    it('should return undefined pages when passed an invalid questionnaire name', () => {
        const schema = questionnaireService.getQuestionnairePagesByQuestionnaireId(
            'this-is-not-a-questionnaire-123'
        );
        expect(schema).toEqual(false);
    });

    it('should return a questionnaire schema page by ID', () => {
        const schema = questionnaireService.getQuestionnairePageById(
            'test',
            'test-date-time-optional'
        );
        const literalPageSchema = {
            $schema: 'http://json-schema.org/draft-04/schema',
            id: 'http://localhost:3000/schema/definitions/test-date-time-optional',
            'x-uri': '/test',
            title: 'JSON Schema Date Time test - required',
            description: 'This is a Date Time test schema',
            type: 'object',
            properties: {
                dob: {
                    type: 'string',
                    format: 'date-time',
                    title: 'What is your date of birth?',
                    errorMessages: {
                        required: 'Enter the date you were born',
                        format: "That date doesn't look right. Try again"
                    }
                }
            }
        };
        expect(schema).toEqual(literalPageSchema);
    });

    it('should return undefined questionnaire page when passed an invalid questionnaire name', () => {
        const schema = questionnaireService.getQuestionnairePageById(
            'this-is-not-a-questionnaire-123',
            'test-boolean-required'
        );
        expect(schema).toEqual(false);
    });

    it('should return undefined questionnaire page when passed an invalid page name', () => {
        const schema = questionnaireService.getQuestionnairePageById(
            'test',
            'this-is-not-a-page-123'
        );
        expect(schema).toEqual(false);
    });

    it('should return undefined questionnaire page when passed an invalid questionnaire name and page name', () => {
        const schema = questionnaireService.getQuestionnairePageById(
            'this-is-not-a-questionnaire-123',
            'this-is-not-a-page-123'
        );
        expect(schema).toEqual(false);
    });

    it('should validate form data against a questionnaire page schema', () => {
        const requestBody = {
            age: '31'
        };
        const response = questionnaireService.postQuestionnairePageById(
            'test',
            'test-integer-optional',
            requestBody
        );
        expect(response).toEqual({ valid: true });
    });

    it('should get the next questionnaire page', () => {
        const response = questionnaireService.getNextQuestionnairePageIdById(
            'test',
            'test-string-optional'
        );

        expect(response).toEqual('test-string-required');
    });

    it('should get the previous questionnaire page', () => {
        const response = questionnaireService.getPreviousQuestionnairePageIdById(
            'test',
            'test-date-time-optional'
        );

        expect(response).toEqual('test-integer-required');
    });

    it('should validate form data against a questionnaire page schema', () => {
        const response = questionnaireService.postQuestionnairePageById(
            'test',
            'test-integer-optional',
            { age: 31 }
        );
        expect(response).toEqual({ valid: true });
    });

    it('should not allow invalid form data against a questionnaire page schema', () => {
        const response = questionnaireService.postQuestionnairePageById(
            'test',
            'test-integer-optional',
            { age: 'thisisnotanumber' }
        );
        expect(response).toEqual({ age: 'should be integer' });
    });

    it('should not allow invalid form data against a questionnaire page schema', () => {
        const response = questionnaireService.postQuestionnairePageById(
            'test',
            'test-integer-optional',
            { age: '-2' }
        );
        expect(response).toEqual({ age: "You can't be less than 0 years old." });
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
