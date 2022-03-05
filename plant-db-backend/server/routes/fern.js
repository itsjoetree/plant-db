const express = require('express')
const mongoose = require('mongoose')
const fernSchema = require('../schemas/fern')
const router = express.Router()

const Fern = mongoose.model('Fern', fernSchema)

router.get('/', async (req, res) => {
  const top = req.query.top
  const skip = req.query.skip

  const ferns = await Fern.find()

  res.send(ferns)
})

router.get('/schema', (req, res) => {
  res.send('testing /schema')
})

router.get('/:id', (req, res) => {
  res.send('testing /:id')
})

module.exports = router