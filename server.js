const express = require('express');
const bodyParser = require('body-parser');
const routesChamados = require('./routes/routesChamados');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/chamados', routesChamados);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});