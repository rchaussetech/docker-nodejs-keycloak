const session = require('express-session')
const Keycloak = require('keycloak-connect')

let _keycloak

const keycloakConfig = {
  clientId: 'docker-nodejs-keycloak',
  bearerOnly: true,
  serverUrl: 'http://host.docker.internal:3030/auth',
  realm: 'Nodejs-Realm',
  credentials: {
    secret: '2d5cf1b4-c73d-4db6-9a4c-3057775313af'
  }
}

function initKeycloak(app) {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!")
    return _keycloak
  }
  else {
    console.log("Initializing Keycloak...")
    const memoryStore = new session.MemoryStore()
    app.use(session({
      secret: keycloakConfig.credentials.secret,
      resave: false,
      saveUninitialized: true,
      store: memoryStore
    }))
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    console.log("Keycloak Initialized.")
    return _keycloak
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please called init first.')
  }
  return _keycloak
}

module.exports = {
  initKeycloak,
  getKeycloak
}