const express = require('express');
const router = express.Router();
// const chamadoController = require('../controllers/chamadoController');
const User = require('../models/User');
const Chamado = require('../models/Chamado');

// router.get('/chamados', chamadoController.getChamados);
// router.post('/chamados', chamadoController.createChamado);

// Breno: criar um usuario
router.post('/users', async (req, res) => {
    try {
      const { name, matricula, password } = req.body;
      const user = await User.create({ name, matricula, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Breno: criar um chamado, relacionado aquele usuario
router.post('/chamados/:userId', async (req, res) => {
  try {
    const { categoria,local,descricao,status } = req.body;
    const {userId} = req.params
    const chamado = await Chamado.create({ categoria,local,descricao,status,userId });
    res.status(201).json(chamado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Breno: todos os usuario
router.get('/users', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Breno: todos os chamados
router.get('/chamados', async (req, res) => {
  try {
      const chamados = await Chamado.findAll();
      res.json(chamados);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Breno: chamados do usuario
router.post('/users/:userId/chamados', async (req, res) => {
    try {
      const { userId } = req.params;
      const chamados = await Chamado.findAll({
        where: { userId },
        include: { model: User, attributes: ['id', 'name', 'matricula'] }, // Opcional: incluir dados do usuário
      });
  
      if (chamados.length === 0) {
        return res.status(404).json({ message: 'Nenhum chamado encontrado para este usuário.' });
      }
  
      res.status(200).json(chamados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// deletar chamado
router.delete('/chamados/:chamadoId', async (req, res) => {
  try {
    const { chamadoId } = req.params;
    const chamado = await Chamado.findByPk(chamadoId);
    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    await chamado.destroy();
    res.status(200).json({ message: 'Chamado deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// atualizar status do chamado
router.put('/chamados/:chamadoId/status', async (req, res) => {
  try {
    const { chamadoId } = req.params;
    const { funcionarioId } = req.body;

    // Verifica se o funcionário existe
    const funcionario = await User.findOne({ where: { id: funcionarioId, funcionario: true } });
    if (!funcionario) {
      return res.status(400).json({ message: 'Funcionário não encontrado.' });
    }

    // Busca o chamado
    const chamado = await Chamado.findByPk(chamadoId);
    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    // Atualiza o status e associa o funcionário
    chamado.status = true;
    chamado.funcionarioId = funcionarioId;
    await chamado.save();

    res.status(200).json({ message: 'Status atualizado para true.', chamado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;