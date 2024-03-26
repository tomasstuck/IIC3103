const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})