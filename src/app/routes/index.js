const express = require('express');
const schemaService = require('../services/schemaService');
const questionnaireService = require('../services/questionnaireService');

const router = express.Router();

router.get('/schema/:schemaId', (req, res) => {
    const { schemaId } = req.params;
    const response = schemaService.getSchemaById(schemaId);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.post('/schema/:schemaId', (req, res) => {
    const { schemaId } = req.params;
    const reqBody = req.body;
    const response = schemaService.postSchemaById(schemaId, reqBody);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.get('/ui-schema/:schemaId', (req, res) => {
    const { schemaId } = req.params;
    const response = schemaService.getUISchemaById(schemaId);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.get('/questionnaire/:questionnaireId', (req, res) => {
    const { questionnaireId } = req.params;
    const response = questionnaireService.getQuestionnaireById(questionnaireId);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.post('/questionnaire/:questionnaireId', (req, res) => {
    const { questionnaireId } = req.params;
    const reqBody = req.body;
    const response = questionnaireService.postQuestionnaireById(questionnaireId, reqBody);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.get('/questionnaire/:questionnaireId/sections', (req, res) => {
    const { questionnaireId } = req.params;
    const response = questionnaireService.getQuestionnaireSectionsByQuestionnaireId(
        questionnaireId
    );
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.get('/questionnaire/:questionnaireId/sections/ids', (req, res) => {
    const { questionnaireId } = req.params;
    const response = questionnaireService.getQuestionnaireSectionsIdsByQuestionnaireId(
        questionnaireId
    );
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.get('/questionnaire/:questionnaireId/section/:sectionId', (req, res) => {
    const { questionnaireId } = req.params;
    const { sectionId } = req.params;
    const response = questionnaireService.getQuestionnaireSectionById(questionnaireId, sectionId);
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

router.post('/questionnaire/:questionnaireId/section/:sectionId', (req, res) => {
    const { questionnaireId } = req.params;
    const { sectionId } = req.params;
    const reqBody = req.body;
    const response = questionnaireService.postQuestionnaireSectionById(
        questionnaireId,
        sectionId,
        reqBody
    );
    if (response) {
        return res.json(response);
    }

    return res.json({ error: 'not found' });
});

// router.get('/questionnaire/:questionnaireId/nextsectionid/:currentSectionId', (req, res) => {
//     const { questionnaireId } = req.params;
//     const { currentSectionId } = req.params;
//     const response = questionnaireService.getNextQuestionnaireSectionIdById(
//         questionnaireId,
//         currentSectionId
//     );
//     if (response === -1) {
//         return res.json({ sectionId: 'none' });
//     }
//     if (response) {
//         return res.json({ sectionId: response });
//     }

//     return res.json({ error: 'not found' });
// });

// router.get('/questionnaire/:questionnaireId/previoussectionid/:currentSectionId', (req, res) => {
//     const { questionnaireId } = req.params;
//     const { currentSectionId } = req.params;
//     const response = questionnaireService.getPreviousQuestionnaireSectionIdById(
//         questionnaireId,
//         currentSectionId
//     );

//     if (response === -1) {
//         return res.json({ sectionId: 'none' });
//     }
//     if (response) {
//         return res.json({ sectionId: response });
//     }

//     return res.json({ error: 'not found' });
// });

module.exports = router;
