import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors()) // Enable CORS

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})
