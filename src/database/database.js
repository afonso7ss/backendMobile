const { Sequelize } = require('sequelize');
require('dotenv').config();

// URL de conexão pública
const databaseUrl = 'mysql://root:yqSGzGfCuiIvOazXLMajeWsxjIpKiPLU@autorack.proxy.rlwy.net:51059/railway';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false, // Desativa logs SQL no console
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
