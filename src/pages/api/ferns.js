import connectDB from "../../middleware/mongodb"
import Fern from "../../models/fern"
import { checkDropdownsHasError, generateRecords, generateSchema } from "../../helpers/fern"

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.query.top && isNaN(req.query.top)) return res.status(500).send('top parameter must be numeric.')
      if (req.query.skip && isNaN(req.query.skip)) return res.status(500).send('skip parameter must be numeric.')
    
      let ferns = Fern.find()
      const skip = parseInt(req.query.skip)
      const top = parseInt(req.query.top)
      
      if (skip >= 0)
        ferns = ferns.skip(skip)
    
      if (top >= 0)
        ferns = ferns.limit(top)
    
      ferns = await ferns
    
      const tableInfo = {
        schema: generateSchema(),
        rows: ferns.map(fern => generateRecords(fern)),
        totalCount: await Fern.count()
      }
    
      return res.send(tableInfo)
    case 'POST':
      const newFern = req.body

      if (checkDropdownsHasError(newFern)) return
    
      Fern.create(newFern)
        .then(r => res.status(200).send(r._id))
        .catch(err => { 
          if (err.errors.name.properties.path === 'name') res.status(500).send('Name already exists.')
          else res.status(500).send('Unable to update record.')
        })
      return
    default:
        res.status(500).send('Request Method not supported.')
      break
  }
}

/*router.get('/schema', (req, res) => {
  res.send(generateSchema())
})

router.get('/:id', async (req, res) => {
  let fern;
  let objectId;

  try {
    objectId = mongoose.Types.ObjectId(req.params.id)
  } catch {
    return res.status(500).send('Invalid Id.')
  }

  fern = await Fern.findById(objectId)
  if (!fern) return res.status(404).send('Record not found.')

  const modelInfo = {
    schema: generateSchema(),
    records: generateRecords(fern)
  }

  res.send(modelInfo)
})

router.put('/:id', async (req, res) => {
  let objectId;

  try {
    objectId = mongoose.Types.ObjectId(req.params.id)  
  } catch {
    return res.status(500).send('Invalid Id.')
  }

  const fern = await Fern.findById(objectId)
  if (!fern) return res.status(404).send('Unable to update non-exsistant record.')
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
    return es.status(500).send('Invalid Id.')
  }

  fern = await Fern.findById(objectId)
  if (!fern) return res.status(404).send('Record not found.')

  try {
    await fern.remove()
    res.status(200).send('Record deleted.')
  } catch {
    res.status(500).send('Unable to update record.')
  }
})*/

export default connectDB(handler)