const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const hashSenha = (senha) =>
  crypto.createHash('sha256').update(senha).digest('hex');

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // validação: campos obrigatórios
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Informe e-mail e senha.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    // validação: falha de autenticação (mesma mensagem para os dois casos)
    if (!usuario || usuario.senha !== hashSenha(senha)) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // tempo de expiração exigido pela prova
    );

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno ao fazer login.' });
  }
};