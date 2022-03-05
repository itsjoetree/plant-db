const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const top = req.query.top
  const skip = req.query.skip

  res.send('testing /')
})

router.get('/schema', (req, res) => {
  res.send('testing /schema')
})

router.get('/:id', (req, res) => {
  res.send('testing /:id')
})

module.exports = router