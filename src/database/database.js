const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Configurando a conexão com o MySQL
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: false, // Desativa logs SQL no console
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco MySQL com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error.message);
  }
})();

module.exports = sequelize;