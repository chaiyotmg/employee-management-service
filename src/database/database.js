const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

const dbPath = path.join(__dirname, './database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('CRITICAL: Could not connect to SQLite database:', err.message);
        process.exit(1);
    }
});

db.query = promisify(db.all).bind(db);
db.execute = promisify(db.run).bind(db);
db.getOne = promisify(db.get).bind(db);
db.initDB = async () => {
    try {
        await db.getOne('SELECT 1');
        console.log('Database connection heartbeated successfully.');
    } catch (err) {
        console.error('DATABASE_ERROR: Heartbeat failed:', err.message);
        throw err;
    }
};

module.exports = db;
