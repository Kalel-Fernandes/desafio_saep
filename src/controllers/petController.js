const { Pet, Tutor } = require('../models');

// GET /api/pets
exports.listar = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [{ model: Tutor, as: 'tutor' }],
      order: [['nome', 'ASC']],
    });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar pets.' });
  }
};

// POST /api/pets  → obrigatoriamente associado a um tutor
exports.criar = async (req, res) => {
  try {
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    if (!nome || !especie || !tutor_id) {
      return res.status(400).json({ erro: 'Nome, espécie e tutor são obrigatórios.' });
    }

    const tutor = await Tutor.findByPk(tutor_id);
    if (!tutor) return res.status(404).json({ erro: 'Tutor não encontrado.' });

    const pet = await Pet.create({ nome, especie, raca, data_nascimento, tutor_id });
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar pet.' });
  }
};