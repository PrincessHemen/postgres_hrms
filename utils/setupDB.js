import { query } from "./connectToDB.js"
import { createRoleQuery, createEmployeeTableQuery } from "./sqlQuery.js"

export async function ensureEmployeeTable() {
    const response = await query(`SELECT to_regclass('employee_details')`)
    if (!response.rows[0].to_regclass) {
        await query(createRoleQuery)
        await query(createEmployeeTableQuery)
        console.log("employee_details table created")
    }
}