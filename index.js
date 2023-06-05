const express = require('express');
const { sequelize, testDatabaseConnection } = require('./database');
const usuarios = require('./routes/usuarioRoutes');
const login = require('./routes/loginRoutes');
const cita = require('./routes/citaRoutes')
const dentista = require('./routes/dentistaRoutes');
const historiaMedica = require('./routes/historiaMedicaRoutes');
const paciente = require('./routes/pacienteRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Habilitar otras apps para realizar solicitudes

app.use(express.static('public'));

app.use('/', login);
app.use('/api/usuarios', usuarios);
app.use('/api/citas', cita);
app.use('/api/dentistas', dentista);
app.use('/api/hisotriasMedicas', historiaMedica);
app.use('/api/pacientes',paciente);




app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);

  // Verificar la conexión a la base de datos
  testDatabaseConnection()
    .then(() => {
      console.log('Conexión a la base de datos establecida correctamente');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    });
});
