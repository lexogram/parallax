const express = require('express')
const router = express.Router()

const welcome = (request, response) => {
<<<<<<< HEAD
  response.send("Welcome to Express Router")
=======
  response.send("Welcome to Express get Router")
>>>>>>> 2876f44784610b61a87a6a8eb44f2c94aaecabe5
}

router.get('/', welcome)

module.exports = router
