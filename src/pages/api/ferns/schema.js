import connectDB from "../../../middleware/mongodb"
import { generateSchema } from "../../../helpers/fern"

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            return res.send(generateSchema())
        default:
            return res.status(500).send('Request Method not supported.')
    }
}

export default connectDB(handler)