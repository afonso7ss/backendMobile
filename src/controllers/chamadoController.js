const chamadoService = require('../services/chamadoService');

exports.getChamados = async (req, res) => {
  try {
    const chamados = await chamadoService.getChamadosEmAberto();
    res.status(200).json(chamados);
  } catch (error) {
    console.log(error);
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

exports.login = async (req, res) => {
  const {matricula, senha} = req.body;
  try {
    
  } catch (error) {
    
  }
}
exports.updateChamadoStatus = async (req, res) => {
  const { chamadoId } = req.params;
  const { status } = req.body;
  try {
    const updated = await chamadoService.updateChamadoStatus(chamadoId, status);
    if (!updated) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }
    res.status(200).json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar chamado.' });
  }
};