const { json } = require("express")
const express = require("express")
const fs = require("fs/promises")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(json())
app.use(cors())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

// how to get data from file to serve
const readFile = async location => {
  try {
    return await fs.readFile(path.resolve(__dirname, location), "utf-8")
  } catch (err) {
    console.error(err)
  }
}
// send data in response to get request
app.get("/", async (_req, res) => {
  const data = await readFile("./countries.json")
  res.status(200).send(data)
})
