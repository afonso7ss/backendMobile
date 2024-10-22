const db = require('../database/database');

exports.getChamadosEmAberto = async () => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM Chamados WHERE status = ?', ['em_aberto']);
    await connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.createChamado = async (descricao, categoria, local) => {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO Chamados (descricao, categoria, local, status) VALUES (?, ?, ?, ?)',
      [descricao, categoria, local, 'em_aberto']
    );
    await connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};