const express = require("express");
const path = require("path")

const PORT = process.env.PORT || 3001;

const fernRouter = require("./routes/fern")
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/ferns", fernRouter)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})