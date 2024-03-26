const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); // Módulo para manejar rutas de archivos
const port = process.env.PORT || 3000; // Usar el puerto proporcionado por Render o el puerto 3000 si no está definido

//// Clases
// User
class User {
    constructor(id, username, avatar, created) {
        this.id = User.setID()
        this.username = username
        this.avatar = avatar
        this.created = new Date()
    }

    static setID() {
        if (!User.latestID) User.latestID = 1
        else User.latestID++
        return User.latestID
    }
}

//// Bases de datos en memoria
// Users
let users = []

//// Middlewares
app.use(express.json())
app.use(cors())

//// API
// POST User
app.post('/users', (req, res) => {
  const {username, avatar} = req.body
  const newUser = new User(null, username, avatar, null)
  users.push(newUser)
  console.log('User:', newUser.username)
  res.status(201).json(newUser)
})

// GET Users
app.get('/users', (req, res) => {
  users.forEach(user => {
    console.log('Username:', user.username)
  })
  res.status(200).json(users)
})

// Servir archivos estáticos (como tu index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Manejador de ruta para la ruta raíz ('/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envía el archivo index.html
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
