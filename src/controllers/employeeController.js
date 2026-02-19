const employeeService = require('../services/employeeService');

const renderIndex = async (req, res) => {
    try {
        const firstEmployee = await employeeService.getFirstEmployee();
        res.render('index', { firstEmployee });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createEmployee = async (req, res) => {
    try {
        const { empNum, empName, postion } = req.body;
        if (!empNum || !empName || !postion) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        await employeeService.createEmployee({
            EmpNum: empNum,
            EmpName: empName,
            Position: postion
        });

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    renderIndex,
    createEmployee
};

