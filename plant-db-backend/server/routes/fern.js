const express = require('express')
const mongoose = require('mongoose')
const Fern = require('../schemas/fern')
const router = express.Router()

const lightingConditionDropdown = [
  {name: 'Bright', value: 'Bright'},
  {name: 'Partial Sun', value: 'PartialSun'},
  {name: 'Low', value: 'Low'}
]

const wateringIntervalDropdown = [
  {name: 'Often', value: 'Often'},
  {name: 'Sometimes', value: 'Sometimes'},
  {name: 'Seldom', value: 'Seldom'}
]

// Generates a schema for presenting data on the frontend
function generateSchema() {
    return [
      { propertyName: 'id', type: 'Number', isKey: true, isHidden: true },
      { propertyName: 'name', displayName: 'Name', type: 'String', isIdentifier: true, isRequired: true },
      { propertyName: 'nickname', displayName: 'Nickname', type: 'String', isRequired: false },
      { propertyName: 'description', displayName: 'Description', type: 'String', isRequired: true },
      { propertyName: 'lightingCondition', displayName: 'Lighting Condition', type: 'Dropdown', isRequired: true, dropdown: lightingConditionDropdown },
      { propertyName: 'wateringInterval', displayName: 'Watering Interval', type: 'Dropdown', isRequired: true, dropdown: wateringIntervalDropdown },
      { propertyName: 'avgHeightInches', displayName: 'Avg. Height (IN)', type: 'Number', isRequired: true },
      { propertyName: 'origin', displayName: 'Origin', type: 'String', isRequired: false },
    ]
}

// Generates records for presenting data on the frontend
function generateRecords(fern) {
  return [
    { propertyName: 'id', value: fern.id },
    { propertyName: 'name', value: fern.name },
    { propertyName: 'nickname', value: fern.nickname },
    { propertyName: 'description', value: fern.description },
    { propertyName: 'lightingCondition', value: fern.lightingCondition },
    { propertyName: 'wateringInterval', value: fern.wateringInterval },
    { propertyName: 'avgHeightInches', value: fern.avgHeightInches },
    { propertyName: 'origin', value: fern.origin },
  ]
}

// Checks if dropdown values are valid, if there is an error: return true
function checkDropdownsHasError(fern) {
  if (wateringIntervalDropdown.findIndex(d => d.value === fern.wateringInterval) === -1) {
    res.status(409).send('Invalid Watering Interval.')
    return true;
  }

  if (lightingConditionDropdown.findIndex(d => d.value === fern.lightingCondition) === -1) {
    res.status(409).send('Invalid Lighting Condition.')
    return true;
  }
}

router.get('/', async (req, res) => {
  if (req.query.top && isNaN(req.query.top)) res.status(500).send('top parameter must be numeric.')
  if (req.query.skip && isNaN(req.query.skip)) res.status(500).send('skip parameter must be numeric.')

  const ferns = await Fern.find().skip(req.query.skip).limit(req.query.top)

  const tableInfo = {
    schema: generateSchema(),
    rows: ferns.map(fern => generateRecords(fern)),
    totalCount: await Fern.count()
  }

  res.send(tableInfo)
})

router.get('/schema', (req, res) => {
  res.send(generateSchema())
})

router.get('/:id', async (req, res) => {
  let fern;
  let objectId;

  try {
    objectId = mongoose.Types.ObjectId(req.params.id)
  } catch {
    res.status(500).send('Invalid Id.')
  }

  fern = await Fern.findById(objectId)
  if (!fern) { res.status(404).send('Record not found.'); return; }

  const modelInfo = {
    schema: generateSchema(),
    records: generateRecords(fern)
  }

  res.send(modelInfo)
})

router.post('/', async (req, res) => {  
  const newFern = req.body

  if (checkDropdownsHasError(newFern)) return

  Fern.create(newFern)
    .then(r => res.status(200).send(r._id))
    .catch(err => { 
      if (err.errors.name.properties.path === 'name') res.status(500).send('Name already exists.')
      else res.status(500).send('Unable to update record.')
    })
})

router.put('/:id', async (req, res) => {
  let objectId;

  try {
    objectId = mongoose.Types.ObjectId(req.params.id)  
  } catch {
    res.status(500).send('Invalid Id.')
  }

  const fern = await Fern.findById(objectId)
  if (!fern) { res.status(404).send('Unable to update non-exsistant record.'); return; }

  const fernObj = {}

  fernObj.lightingCondition = req.body.lightingCondition
  fernObj.wateringInterval = req.body.wateringInterval

  if (checkDropdownsHasError(fern)) return

  const existingRecord = await Fern.findOne({ name: req.body.name })
  if (existingRecord && existingRecord.id !== req.params.id) { res.status(500).send('Name already exists.'); return }
  
  if (fern.name !== req.body.name) fernObj.name = req.body.name
  fernObj.id = req.params.id
  fernObj.nickname = req.body.nickname
  fernObj.description = req.body.description
  fernObj.avgHeightInches = req.body.avgHeightInches
  fernObj.origin = req.body.origin

  try {
    await Fern.findOneAndUpdate({ _id: req.params.id }, fernObj, { runValidators: true, context: 'query' })
    res.status(200).send('Record updated.')
  } catch {
    res.status(500).send('Unable to update record.')
  }
})

router.delete('/:id', async (req, res) => {
  let fern;
  let objectId;

  try {
    objectId = mongoose.Types.ObjectId(req.params.id)  
  } catch {
    res.status(500).send('Invalid Id.')
  }

  fern = await Fern.findById(objectId)
  if (!fern) { res.status(404).send('Record not found.'); return; }

  try {
    await fern.remove()
    res.status(200).send('Record deleted.')
  } catch {
    res.status(500).send('Unable to update record.')
  }
})

module.exports = router