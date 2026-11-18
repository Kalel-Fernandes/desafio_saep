const { Agendamento, Pet, Tutor } = require('../models');

// GET /api/agendamentos  → ordenado por dia, com dados do pet e do tutor
exports.listar = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({
      include: [{ model: Pet, as: 'pet', include: [{ model: Tutor, as: 'tutor' }] }],
      order: [['data_agendamento', 'ASC']],
    });
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar agendamentos.' });
  }
};

// POST /api/agendamentos
exports.criar = async (req, res) => {
  try {
    const { data_agendamento, motivo, pet_id } = req.body;
    if (!data_agendamento || !motivo || !pet_id) {
      return res.status(400).json({ erro: 'Data, motivo e pet são obrigatórios.' });
    }

    const pet = await Pet.findByPk(pet_id);
    if (!pet) return res.status(404).json({ erro: 'Pet não encontrado.' });

    const agendamento = await Agendamento.create({
      data_agendamento,
      motivo,
      pet_id,
      usuario_id: req.usuario.id, // quem está logado
    });
    res.status(201).json(agendamento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar agendamento.' });
  }
};

// PUT /api/agendamentos/:id/data  → atualiza só a data
exports.atualizarData = async (req, res) => {
  try {
    const { data_agendamento } = req.body;
    if (!data_agendamento || isNaN(new Date(data_agendamento))) {
      return res.status(400).json({ erro: 'Informe uma data válida.' });
    }

    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado.' });

    await agendamento.update({ data_agendamento });
    res.json(agendamento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar agendamento.' });
  }
};