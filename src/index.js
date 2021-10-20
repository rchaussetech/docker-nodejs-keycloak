// IMPORTAÇÃO DOS MODULOS DO NPM
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// CRIAÇÃO DO EXPRESS APP
const app = express()

// IMPORTAÇÃO E INIT DO KEYCLOAK
const keycloak = require('./configs/keycloak-config.js')
  .initKeycloak(app)
app.use(keycloak.middleware())

// USE MIDDLEWARE
app.use(bodyParser.json())

// USE CORS
app.use(cors())

// DEFINIÇÃO DA ROTA BASE
app.get('/', (req, res) => res.send('Server is up!'))

const testController = require('./controllers/test-controller.js')
app.use('/test', testController)

// CRIAÇÃO DO SERVIDOR HTTP
const server = http.createServer(app)
const port = process.env.NODE_PORT

// FAZ O SERVIDOR RESPONDER NA PORTA 3000
server.listen(port, () => console.log('Servidor rodando na porta %s.', port))

