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

export default connectDB(handler)