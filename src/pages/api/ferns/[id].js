import connectDB from "../../../middleware/mongodb"
import Fern from "../../../models/fern"
import { checkDropdownsHasError, generateRecords, generateSchema } from "../../../helpers/fern"

const handler = async (req, res) => {
    let fern
    let objectId

    switch (req.method) {
        case 'PUT':
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

            return
        case 'DELETE':
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
            return
        case 'GET':
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
            
            return res.send(modelInfo)
        default:
            return res.status(500).send('Request Method not supported.')
    }
}

export default connectDB(handler)