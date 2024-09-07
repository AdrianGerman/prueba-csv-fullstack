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
  try {
    // 4. transform file (buffer) to string
    const result = Buffer.from(file.buffer).toString("utf-8")
    console.log(result)
    // 5. transform string to CSV
    const csv = csvToJson.csvStringToJson(result)
    userData = csv
  } catch (error) {}
  // 6. save the JSON to DB (or memory)
  // 7. return 200 with the message and the JSON
  return res
    .status(200)
    .json({ data: [], message: "E; archivo se cargó correctamente" })
})

app.get("/api/users", async (req, res) => {
  // --- TODOS ---
  // 1. extract the query param "q" from the request
  // 2. validate that we have the query param
  // 3. filter the data from the DB (or memory) with the query param
  // 4. return 200 with the message and the JSON
  return res.status(200).json({ data: [] })
})

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})
