const questionnaireService = require('../../src/services/questionnaireService');
const testQuestionnaireDefinition = require('../../schema/questionnaires/test.json');

describe('When using the questionnaireService', () => {
    // beforeEach(() => {
    //     return 'blah';
    // });

    it('should return a questionnaire by ID', () => {
        const schema = questionnaireService.getQuestionnaireById('test');
        expect(schema).toEqual(testQuestionnaireDefinition);
    });

    it('should return "false" when passed an invalid questionnaire name', () => {
        const schema = questionnaireService.getQuestionnaireById('this-is-not-a-questionnaire-123');
        expect(schema).toEqual(false);
    });

    it('should return a list of questionnaire sections', () => {
        const schema = questionnaireService.getQuestionnaireSectionsByQuestionnaireId('test');
        expect(schema).toEqual(testQuestionnaireDefinition.sections);
    });

    it('should return list questionnaire section IDs', () => {
        const result = questionnaireService.getQuestionnaireSectionsIdsByQuestionnaireId('test');
        const expectResult = Object.keys(testQuestionnaireDefinition.sections);
        expect(result).toEqual(expectResult);
    });

    it('should return questionnaire section', () => {
        const result = questionnaireService.getQuestionnaireSectionById(
            'test',
            'p--test-string-required'
        );
        const expectResult = testQuestionnaireDefinition.sections['p--test-string-required'];
        expect(result).toEqual(expectResult);
    });
});
