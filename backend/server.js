const openDB = require('./db')
const openApp = require('./app')

openDB.then(openApp).catch(error => {
  throw error
});
