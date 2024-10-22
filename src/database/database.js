require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

exports.getConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('conectado ao bancoo')
    return 
        connection;
  } catch (error) {
    throw error;
  }
};
