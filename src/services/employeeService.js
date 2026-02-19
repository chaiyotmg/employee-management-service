const employee = require('../models/employee');

const getFirstEmployee = async () => {
    try {
        return await employee.findFirstByEmpNum('ASC');
    } catch (error) {
        throw error;
    }
};

const createEmployee = async (employeeData) => {
    try {
        employeeData.HireDate = new Date().toISOString().split('T')[0];
        employeeData.Salary = 0;
        employeeData.DepNo = '00';
        return await employee.createEmployee(employeeData);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getFirstEmployee,
    createEmployee
};
