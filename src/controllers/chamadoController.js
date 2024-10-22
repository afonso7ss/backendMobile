const chamadoService = require('../services/chamadoService');

exports.getChamados = async (req, res) => {
  try {
    const chamados = await chamadoService.getChamadosEmAberto();
    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamados.' });
  }
};

exports.createChamado = async (req, res) => {
  const { descricao, categoria, local } = req.body;
  try {
    const chamadoId = await chamadoService.createChamado(descricao, categoria, local);
    res.status(201).json({ message: 'Chamado criado com sucesso!', chamadoId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
};
