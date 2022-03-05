const express = require("express");
const path = require("path")

const PORT = process.env.PORT || 3001;

const fernRouter = require("./routes/fern")
const app = express()

const mongoose = require('mongoose')

const url = `mongodb+srv://plant:lofiplant@cluster0.d21af.mongodb.net/plantDb?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
  .then( () => {
      console.log('Connected to MongoDB Atlas')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  })

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/ferns", fernRouter)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})