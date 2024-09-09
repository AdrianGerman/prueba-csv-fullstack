import express from "express"
import cors from "cors"
import multer from "multer"
import csvToJson from "convert-csv-to-json"

const app = express()
const port = process.env.PORT ?? 3000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let userData: Array<Record<string, string>> = []

app.use(cors()) // Enable CORS

app.post("/api/files", upload.single("file"), async (req, res) => {
  // --- TODOS ---
  // 1. extract file from request
  const { file } = req
  // 2. validate that we have file
  if (!file) {
    return res.status(500).json({ message: "File is require" })
  }
  // 3. validate the mimetype (csv)
  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "File must be CSV" })
  }
  let json: Array<Record<string, string>> = []
  try {
    // 4. transform file (buffer) to string
    const rawCsv = Buffer.from(file.buffer).toString("utf-8")
    // 5. transform string (csv) to JSON
    json = csvToJson.fieldDelimiter(",").csvStringToJson(rawCsv)
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" })
  }
  // 6. save the JSON to DB (or memory)
  userData = json
  // 7. return 200 with the message and the JSON
  return res
    .status(200)
    .json({ data: json, message: "The file was uploaded successfully" })
})

app.get("/api/users", async (req, res) => {
  // --- TODOS ---
  // 1. extract the query param "q" from the request
  const { q } = req.query
  // 2. validate that we have the query param
  if (!q) {
    return res.status(500).json({
      message: "Query param 'q' is required"
    })
  }

  if (Array.isArray(q)) {
    return res.status(500).json({
      message: "Query param 'q' must be a string"
    })
  }
  // 3. filter the data from the DB (or memory) with the query param
  const search = q.toString().toLowerCase()
  const filteredData = userData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    )
  })
  // 4. return 200 with the message and the JSON
  return res.status(200).json({ data: filteredData })
})

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})
