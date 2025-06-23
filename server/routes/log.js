const express = require('express');
const router = express.Router();
const { getImportLogs } = require('../controllers/logController');

router.get('/', getImportLogs); // GET /api/import-logs

module.exports = router;