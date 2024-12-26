require('dotenv').config();
export default {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: 'localhost',
    database: 'sgbd',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};