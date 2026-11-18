const { Op } = require('sequelize');
const { Tutor } = require('../models');

// GET /api/tutores?busca=termo  → lista tudo ou filtra pelo termo
exports.listar = async (req, res) => {
  try {
    const { busca } = req.query;
    const where = busca
      ? {
          [Op.or]: [
            { nome: { [Op.like]: `%${busca}%` } },
            { telefone: { [Op.like]: `%${busca}%` } },
            { email: { [Op.like]: `%${busca}%` } },
          ],
        }
      : {};
    const tutores = await Tutor.findAll({ where, order: [['nome', 'ASC']] });
    res.json(tutores);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar tutores.' });
  }
};

// GET /api/tutores/:id  → usado para preencher o formulário de edição
exports.buscarPorId = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado.' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tutor.' });
  }
};

// POST /api/tutores
exports.criar = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, endereco } = req.body;
    if (!nome || !cpf || !telefone) {
      return res.status(400).json({ erro: 'Nome, CPF e telefone são obrigatórios.' });
    }
    const tutor = await Tutor.create({ nome, cpf, telefone, email, endereco });
    res.status(201).json(tutor);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar tutor.' });
  }
};

// PUT /api/tutores/:id  → edita e salva no banco
exports.atualizar = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado.' });

    const { nome, cpf, telefone, email, endereco } = req.body;
    if (!nome || !cpf || !telefone) {
      return res.status(400).json({ erro: 'Nome, CPF e telefone são obrigatórios.' });
    }

    await tutor.update({ nome, cpf, telefone, email, endereco });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tutor.' });
  }
};