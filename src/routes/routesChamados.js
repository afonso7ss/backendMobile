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

// Breno: login do usuario
// router.post('/login', async (req, res) => {
router.post('/auth/login', async (req, res) => {
  try {
    const { matricula, password } = req.body;
    const user = await User.findOne({ where: {
      matricula: matricula,
      password: password,
    }});
    if(user != null) {
      return res.status(200).json(user); 
    } else {
      return res.status(404).json({message: "userrr not found"}); 
    }
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
        res.status(200).json(user);
        console.log('user', user);
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
router.get('/users/:userId/chamados', async (req, res) => {
    try {
      const { userId } = req.params;
      const chamados = await Chamado.findAll({
        where: { userId: userId },
        // include: { model: User, attributes: ['id', 'name', 'matricula'] }, // Opcional: incluir dados do usuário
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
router.put('/chamados/:funcionarioId/status', async (req, res) => {
  try {
    const { funcionarioId } = req.params;
    const { chamadoId } = req.body;

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

router.post('/funcionario/', async (req, res) => {
  try {
    const { funcionarioId } = req.body;
    const funcionario = await User.findOne({ where: { id: funcionarioId, funcionario: false } });
    if (!funcionario) {
      return res.status(400).json({ message: 'Funcionário não encontrado.' });
    }
    funcionario.funcionario = true;
    await funcionario.save();
    res.status(200).json({ message: 'Funcionario atualizado para true.', funcionario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // Feche aqui o bloco do POST

// Agora defina a rota PUT fora do POST /funcionario/
router.put('/chamados/:chamadoId', async (req, res) => {
  try {
    const { chamadoId } = req.params;
    const { status } = req.body; // status: true ou false
    const chamado = await Chamado.findByPk(chamadoId);
    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    chamado.status = status;
    await chamado.save();
    return res.status(200).json({ message: 'Status atualizado com sucesso.', chamado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;