/*
 * Questionnaire Service
 */

const path = require('path');
const validator = require('q-validator')();
const schemaService = require('../services/schemaService');
const fs = require('fs');

function getQuestionnaireById(questionnaireId) {
    const schemaDirPath = path.resolve(__dirname, '../../schema/questionnaires/');
    const schemaPath = path.resolve(schemaDirPath, `${questionnaireId}.json`);
    let schema;

    // fs is preferred over require.
    // schema = require(schemaPath);
    if (fs.existsSync(schemaPath)) {
        schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        return schema;
    }
    return false;
}

function getQuestionnaireSectionsByQuestionnaireId(questionnaireId) {
    const schema = getQuestionnaireById(questionnaireId);
    if (schema && schema.sections) {
        return schema.sections;
    }
    return false;
}

function getQuestionnaireSectionsIdsByQuestionnaireId(questionnaireId) {
    const schema = getQuestionnaireById(questionnaireId);
    if (schema && schema.sections) {
        return Object.keys(schema.sections);
    }
    return false;
}

function getQuestionnaireSectionById(questionnaireId, sectionId) {
    const sections = getQuestionnaireSectionsByQuestionnaireId(questionnaireId);
    let sectionSchema;
    if (sections) {
        Object.keys(sections).forEach(sectionKey => {
            if (sectionKey === sectionId) {
                sectionSchema = sections[sectionKey];
            }
        });
    }
    if (sectionSchema) {
        return sectionSchema;
    }
    return false;
}

function postQuestionnaireSectionById(questionnaireId, sectionId, requestBody) {
    const schema = getQuestionnaireSectionById(questionnaireId, sectionId);
    const uiSchema = schemaService.getUISchemaById(sectionId);
    const validationResult = validator.validationResponseAgainstSchema(
        schema,
        uiSchema,
        requestBody
    );
    return validationResult;
}

// function getNextQuestionnaireSectionIdById(questionnaireId, sectionId) {
//     const sections = getQuestionnaireSectionsByQuestionnaireId(questionnaireId);
//     let nextSectionId;
//     let nextSectionIndex;
//     let currentSectionIndex = null;

//     if (sections) {
//         sections.forEach((section, index) => {
//             if (sections.indexOf(`${sectionId}.json`) !== -1) {
//                 currentSectionIndex = index;
//             }
//         });

//         // if the page is not found (by id), or if last page.
//         if (currentSectionIndex === null || currentSectionIndex === sections.length - 1) {
//             nextSectionIndex = -1;
//         } else {
//             nextSectionIndex = currentSectionIndex + 1;
//         }

//         // if we were unable to find the next page.
//         if (nextSectionIndex === -1) {
//             return -1;
//         }

//         // extract the file name (excluding extension) from the relative
//         // path in the JSON schema definition.
//         nextSectionId = sections[nextSectionId].match(/^.*\/(.*)\.\w+$/);
//         [, nextSectionId] = nextSectionId;
//         return nextSectionId;
//     }

//     return false;
// }

// function getPreviousQuestionnaireSectionIdById(questionnaireId, sectionId) {
//     const sections = getQuestionnaireSectionsByQuestionnaireId(questionnaireId);
//     let previousSectionId;
//     let previousSectionIndex;
//     let currentSectionIndex = null;

//     if (sections) {
//         sections.forEach((section, index) => {
//             if (section.$ref.indexOf(`${sectionId}.json`) !== -1) {
//                 currentSectionIndex = index;
//             }
//         });

//         // if the section is not found (by id), or if first section.
//         if (currentSectionIndex === null || currentSectionIndex === 0) {
//             previousSectionIndex = -1;
//         } else {
//             previousSectionIndex = currentSectionIndex - 1;
//         }

//         // if we were unable to find the next section.
//         if (previousSectionIndex === -1) {
//             return -1;
//         }
//         // extract the file name (excluding extension) from the relative
//         // path in the JSON schema definition.
//         previousSectionId = sections[previousSectionIndex].$ref.match(/^.*\/(.*)\.\w+$/);
//         [, previousSectionId] = previousSectionId;

//         return previousSectionId;
//     }

//     return false;
// }

module.exports = {
    getQuestionnaireById,
    // postQuestionnaireById,

    getQuestionnaireSectionsByQuestionnaireId,
    getQuestionnaireSectionsIdsByQuestionnaireId,

    getQuestionnaireSectionById,
    postQuestionnaireSectionById

    // getNextQuestionnaireSectionIdById,
    // getPreviousQuestionnaireSectionIdById
};
