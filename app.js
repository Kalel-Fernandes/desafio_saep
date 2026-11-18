require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const auth = require('./src/middlewares/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./src/routes/authRoutes'));        // login (pública)

app.get('/api/me', auth, (req, res) => {
  res.json({ id: req.usuario.id, nome: req.usuario.nome });
});

app.use('/api/tutores', auth, require('./src/routes/tutorRoutes'));
app.use('/api/pets', auth, require('./src/routes/petRoutes'));
app.use('/api/agendamentos', auth, require('./src/routes/agendamentoRoutes'));

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`)))
  .catch((e) => console.error('Falha ao conectar no banco:', e.message));