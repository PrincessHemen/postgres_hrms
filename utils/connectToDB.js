import pg from "pg"
import env from "dotenv"

env.config()

const requiredEnvVars = ["PG_USER", "PG_HOST", "PG_DATABASE", "PG_PORT", "PG_PASSWORD"]

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.log(`missing required env variables: ${varName}`)
        process.exit(1) 
    }
})

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
})

db.connect()
    .then((client) => {
        console.log("connected with the database successfully 👍🏾✔")
        client.release()
    })
    .catch((err) => {
        console.log("Couldn't connect with the database", err.message)
        process.exit(1) 
    })

db.on("error", (err) => {
    console.log("Database error", err)
})

export const query = (text, params) => {
    return db.query(text, params)
}

