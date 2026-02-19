const db = require('../database/database');

const findFirstByEmpNum = async (order = 'ASC') => {
    const sql = `SELECT * FROM Employee ORDER BY EmpNum ${order} LIMIT 1`;
    return await db.getOne(sql);
};

const createEmployee = async (data) => {
    const sql = `
        INSERT INTO Employee (EmpNum, EmpName, HireDate, Salary, Position, DepNo, HeadNo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        data.EmpNum,
        data.EmpName,
        data.HireDate,
        data.Salary,
        data.Position,
        data.DepNo,
        data.HeadNo
    ];
    return await db.execute(sql, params);
};

module.exports = {
    findFirstByEmpNum,
    createEmployee
};
