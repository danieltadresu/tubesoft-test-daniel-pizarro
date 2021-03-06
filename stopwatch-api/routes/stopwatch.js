const express = require('express');
const stopwatchController = require('../controllers/stopwatch');

const router = express.Router();

router.get('/', stopwatchController.get);

router.post('/', stopwatchController.add);

router.delete('/', stopwatchController.delete);

module.exports = router;