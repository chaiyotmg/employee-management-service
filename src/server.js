const express = require('express');
const db = require('./database/database');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/', employeeRoutes);

db.initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    });
