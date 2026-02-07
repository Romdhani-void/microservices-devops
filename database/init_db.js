require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlDetails = fs.readFileSync(path.join(__dirname, 'setup.sql')).toString();

// Create connection without selecting a database initially
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true // Important to allow multiple queries in one call
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL server.');

  // Run the SQL script
  connection.query(sqlDetails, (err, results) => {
    if (err) {
      console.error('Error running setup script:', err);
    } else {
      console.log('Database initialized successfully!');
      console.log('Tables created and data inserted.');
    }
    connection.end();
  });
});
