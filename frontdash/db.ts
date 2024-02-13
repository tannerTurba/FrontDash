import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '138.49.184.184',
    user: 'webClient',
    password: 'FrontDash',
    database: 'FrontDash',
    port: 3306
});

export default connection;

