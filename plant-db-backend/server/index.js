require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const Fern = require('./schemas/fern')
const fernRouter = require("./routes/fern")

const PORT = process.env.PORT || 3001

const app = express()

const url = process.env.DB_STRING;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
  .then(() => {
      console.log('Connected to MongoDB Atlas')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`)
  })

app.use(express.json())
app.use(express.urlencoded())
app.use("/api/ferns", fernRouter)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.listen(PORT, async () => {
  await seedDB()
  console.log(`Server listening on ${PORT}`)
})

// A function to populate the database only when the database is empty.
async function seedDB() {
  const count = await Fern.count()
  if (count !== 0) return

  const names = ['Sword', 'Blue', 'Giant', 'Oceanic', 'Purple', 'Dark', 'Forest', 'Snow', 'Lake',
    'Creak', 'Harbor', 'Desert', 'Muddy', 'Honey', 'Tall', 'Crunchy', 'Healthy', 'Sun', 'Moonlight', 'Spring']

  const lightingConditions = ['Bright', 'PartialSun', 'Low']
  const wateringIntervals = ['Often', 'Sometimes', 'Seldom']

  const records = []

  names.forEach(name => {
    records.push({ 
      name: name, nickname: '',
      description: 'Fern that was seeded from DB',
      lightingCondition: lightingConditions[Math.floor((Math.random() * lightingConditions.length))],
      wateringInterval: wateringIntervals[Math.floor((Math.random()* wateringIntervals.length))],
      avgHeightInches: Math.floor(Math.random() * 10) + 1
    })
  })

  try {
    await Fern.create(records)
  } catch {
    console.log('Error while seeding.')
  }

  console.log('DB seeded')
}
