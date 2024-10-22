const express = require('express');
const bodyParser = require('body-parser');
const chamadoController = require('./controllers/chamadoController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/api/chamados', chamadoController.getChamados);
app.post('/api/chamados', chamadoController.createChamado);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
