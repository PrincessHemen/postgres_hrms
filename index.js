import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"

import employeeRoute from "./routes/employee.js"

import { ensureEmployeeTable } from "./utils/setupDB.js"

dotenv.config()

const app = express()
const PORT = 3001

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

//API starting 
app.get("/api", (req, res) => {
    res.send("hello world, Princess here 👋🏾. The HRMS is working, thanks for visiting.")
})

app.use("/api/employee", employeeRoute)

app.use(function (req, res) {
    res.status(404).json({error: "Not Found!"})
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({error: message})
})

app.listen(PORT, async () => {
    await ensureEmployeeTable()
    console.log(`listening on port ${PORT} and ensured of employee tables created`)
})

