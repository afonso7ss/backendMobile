const express = require('express');
const bodyParser = require('body-parser');
const routesChamados = require('./src/routes/routesChamados');
// const { getConnection } = require('./src/database/database');
const sequelize = require('./src/database/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/', routesChamados);

// Sincroniza as models com o banco de dados
sequelize.sync({ force: false }) // `force: true` recria tabelas sempre que o app é reiniciado
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => console.error('Erro ao sincronizar tabelas:', error));


app.listen(PORT, async () => {
  // const connection = await getConnection()
  // const ping = await connection.ping()
  // console.log('connection:', ping);
  
  console.log(`Servidor rodando na porta ${PORT}`);
});