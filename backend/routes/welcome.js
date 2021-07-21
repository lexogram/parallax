const express = require('express')
const router = express.Router()

const welcome = (request, response) => {
  response.send("Welcome to Express get Router")
}

router.get('/', welcome)

module.exports = router
