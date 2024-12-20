require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Importăm conexiunea la baza de date
const User = require('./models/User'); // Importăm modelul User
const Project = require('./models/Project'); // Importăm modelul Project

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pentru procesarea JSON-ului din cereri
app.use(express.json());

// Endpoint pentru înregistrare
app.post('/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Validare simplă
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii.' });
      }
  
      // Verificare dacă utilizatorul există deja
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email-ul este deja înregistrat.' });
      }
  
      // Creare utilizator
      const newUser = await User.create({ name, email, password, role });
      res.status(201).json({ message: 'Utilizator creat cu succes.', user: { id: newUser.id, name, email, role } });
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
      res.status(500).json({ error: 'Eroare de server.' });
    }
  });
  
  // Endpoint pentru autentificare
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validare simplă
      if (!email || !password) {
        return res.status(400).json({ error: 'Email-ul și parola sunt obligatorii.' });
      }
  
      // Găsire utilizator
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Utilizatorul nu există.' });
      }
  
      // Verificare parolă
      const isPasswordValid = password == user.password;
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Parolă incorectă.' });
      }
  
      // Răspuns în cazul autentificării reușite
      res.status(200).json({ message: 'Autentificare reușită.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      res.status(500).json({ error: 'Eroare de server.' });
    }
  });

// Endpoint pentru gestionarea proiectelor
app.post('/projects', async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;

    // Validare simplă
    if (!title || !description || !ownerId) {
      return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii.' });
    }

    // Creare proiect
    const newProject = await Project.create({ title, description, ownerId });
    res.status(201).json({ message: 'Proiect creat cu succes.', project: newProject });
  } catch (error) {
    console.error('Eroare la crearea proiectului:', error);
    res.status(500).json({ error: 'Eroare de server.' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Eroare la afișarea proiectelor:', error);
    res.status(500).json({ error: 'Eroare de server.' });
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Eroare la afișarea detaliilor proiectului:', error);
    res.status(500).json({ error: 'Eroare de server.' });
  }
});

// Testarea conexiunii la baza de date
const startServer = async () => {
  try {
    // Conectarea la baza de date
    await sequelize.authenticate();
    console.log('Conectat la baza de date.');

    // Sincronizarea modelelor cu baza de date
    await sequelize.sync();
    console.log('Modelele au fost sincronizate cu baza de date.');

    // Pornirea serverului
    app.listen(PORT, () => {
      console.log(`Serverul rulează pe http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Eroare la conectarea cu baza de date:', error);
  }
};

startServer();
