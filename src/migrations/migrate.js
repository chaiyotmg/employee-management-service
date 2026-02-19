const db = require('../database/database');

async function migrateAndSeed() {
    try {
        console.log('Starting migration (Raw SQL)...');

        // Drop tables if they exist
        await db.execute(`DROP TABLE IF EXISTS Employee`);
        await db.execute(`DROP TABLE IF EXISTS Department`);
        await db.execute(`DROP TABLE IF EXISTS EmployeeBackup`);

        // Create Department table
        await db.execute(`
            CREATE TABLE Department (
                DepNo VARCHAR(255) PRIMARY KEY NOT NULL,
                DepName VARCHAR(255) NOT NULL,
                Location VARCHAR(255) NOT NULL
            )
        `);

        // Create Employee table
        await db.execute(`
            CREATE TABLE Employee (
                EmpNum VARCHAR(255) PRIMARY KEY NOT NULL,
                EmpName VARCHAR(255) NOT NULL,
                HireDate DATE NOT NULL,
                Salary DECIMAL(10, 2) NOT NULL,
                Position VARCHAR(255) NOT NULL,
                DepNo VARCHAR(255),
                HeadNo VARCHAR(255)
            )
        `);

        // Create EmployeeBackup table
        await db.execute(`
            CREATE TABLE EmployeeBackup (
                EmpNum VARCHAR(255) PRIMARY KEY NOT NULL,
                EmpName VARCHAR(255) NOT NULL,
                Salary DECIMAL(10, 2) NOT NULL,
                Position VARCHAR(255) NOT NULL
            )
        `);

        console.log('Tables created successfully.');

        // Seed Departments
        console.log('Seeding departments...');
        const departments = [
            ['00', 'Executive', 'Silom'],
            ['10', 'Accounting', 'Silom'],
            ['20', 'Administration', 'Sukhumvit'],
            ['30', 'Sales', 'Ratchada'],
            ['40', 'Marketing', 'Silom'],
            ['50', 'Research', 'Sukhumvit']
        ];

        for (const dept of departments) {
            await db.execute(`INSERT INTO Department (DepNo, DepName, Location) VALUES (?, ?, ?)`, dept);
        }

        console.log('Seeding employees...');
        const employees = [
            ['0001', 'Kanjana', '1994-07-10', 50000.00, 'Managing Director', '00', null],
            ['1001', 'Surasit', '1994-03-15', 30000.00, 'Manager', '10', '0001'],
            ['1002', 'Jintana', '1993-10-31', 20000.00, 'Supervisor', '10', '1001'],
            ['1003', 'Siriwan', '1993-06-13', 9000.00, 'Clerk', '10', '1001'],
            ['2001', 'Ternjai', '1994-11-01', 24000.00, 'Manager', '20', '0001'],
            ['2002', 'Chai', '1993-05-14', 14000.00, 'Clerk', '20', '2001'],
            ['3001', 'Benjawan', '1994-06-11', 29000.00, 'Manager', '30', '0001'],
            ['3002', 'Tanachote', '1994-06-14', 25000.00, 'Supervisor', '30', '3001'],
            ['3003', 'Arlee', '1993-08-15', 17000.00, 'Salesman', '30', '3001'],
            ['3004', 'Mitree', '1993-12-05', 13000.00, 'Salesman', '30', '3001'],
            ['3005', 'Tawatchai', '1994-07-03', 10000.00, 'Salesman', '30', '3001'],
            ['4001', 'Wichai', '1993-12-26', 33000.00, 'Manager', '40', '0001'],
            ['4002', 'Thidarat', '1994-12-01', 9000.00, 'Clerk', '40', '4001']
        ];

        for (const emp of employees) {
            await db.execute(`
                INSERT INTO Employee (EmpNum, EmpName, HireDate, Salary, Position, DepNo, HeadNo)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, emp);
        }

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error during migration and seeding:', error);
        process.exit(1);
    }
}

migrateAndSeed();
