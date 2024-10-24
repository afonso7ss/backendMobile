const db = require('../database/database');

exports.getChamadosEmAberto = async () => {
  try {
    const connection = await db.getConnection();
    // const [rows] = await connection.execute('SELECT * FROM Chamados WHERE status = ?', ['em_aberto']);
    const [rows] = await connection.execute('SELECT * FROM chamado WHERE status = false');
    await connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.getChamadosFechados = async () => {
  try {
    const connection = await db.getConnection();
    // const [rows] = await connection.execute('SELECT * FROM Chamados WHERE status = ?', ['em_aberto']);
    const [rows] = await connection.execute('SELECT * FROM chamado WHERE status = true');
    await connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.getChamadosDoUsuario = async () => {
  try {
    const connection = await db.getConnection();
    // const [rows] = await connection.execute('SELECT * FROM Chamados WHERE status = ?', ['em_aberto']);
    const [rows] = await connection.execute('SELECT * FROM chamado WHERE ');
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
      'INSERT INTO chamado (descricao, categoria, local, status) VALUES (?, ?, ?, ?)',
      [descricao, categoria, local, false]
    );
    await connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

