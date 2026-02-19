const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.renderIndex);
router.post('/add', employeeController.createEmployee);

module.exports = router;

