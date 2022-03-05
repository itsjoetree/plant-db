const mongoose = require('mongoose')

const fernSchema = new mongoose.Schema({ 
    name: String,
    description: String,
    lightingCondition: String,
    wateringInterval: String,
    avgHeightInches: Number,
    origin: { country: String, state: String, city: String }
});

module.exports = fernSchema