const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const fernSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    nickname: { 
        type: String,
        required: false,
    },
    description: { 
        type: String,
        required: true,
    },
    lightingCondition: { 
        type: String,
        required: true,
    },
    wateringInterval: { 
        type: String,
        required: true,
    },
    avgHeightInches: { 
        type: Number,
        required: true,
    },
    origin: { 
        type: String,
        required: false,
    },
});

fernSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Fern', fernSchema)