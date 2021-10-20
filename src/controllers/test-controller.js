const express = require('express')
const router = express.Router()

const keycloak = require('../configs/keycloak-config.js')
  .getKeycloak()

router.get('/anonymous', function (req, res) {
  res.send("Hello Anonymous")
})

router.get('/user', keycloak.protect('user'), function (req, res) {
  res.send("Hello User")
})

router.get('/admin', keycloak.protect('admin'), function (req, res) {
  res.send("Hello Admin")
})

router.get('/all-user', keycloak.protect(['user', 'admin']), function (req, res) {
  res.send("Hello All User")
})

module.exports = router

