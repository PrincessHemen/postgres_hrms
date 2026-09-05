import {query} from "../utils/connectToDB.js"
import { getAllEmployeesQuery, createEmployeeQuery, getEmployeeQuery, deleteEmployeeQuery, updateEmployeeQuery } from "../utils/sqlQuery.js"
import { showSuccess, showError, showValidation } from "../utils/errorCodes.js"

export async function getAllEmployees(req, res, next) {
    try {
        const {rows} = await query(getAllEmployeesQuery)
        return res.status(200).json(showSuccess("Employees fetched", rows, 200)) 
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(showError( "Couldn't get employee details", 400))
    }
}

export async function getEmployee(req, res, next) {
    try {
        const id = req.params.id
    const data = await query(getEmployeeQuery, [id])
    if (!data.rows.length) {
        return res.status(404).json(showError("Employee not found", 404)) 
    }
    return res.status(200).json(showSuccess("Employee fetched", data.rows[0]))
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(showError( "Couldn't get the details of the employee with that ID", 400))
    }
}

export async function deleteEmployee(req, res, next) {
    try {
        const id = req.params.id
        const data = await query(deleteEmployeeQuery, [id])
        if (!data.rowCount) {
            return res.status(404).json(showError("Employee not found, therefore not deleted", 404)) 
        }
        return res.status(200).json(showSuccess("Employee deleted successfully", 200))
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(showError( "Couldn't delete that employee because we didn't find that ID", 400))   
    }
}


export async function updateEmployee(req, res, next) {
    try {
        const {id} = req.params
        const {name, email, age, salary, role} = req.body
        const result = await query(updateEmployeeQuery, [name, email, age, role, salary, id]) 
        if (result.rowCount === 0) {
            return res.status(400).json(showError("Couldn't update that employee's details", 400))
        }
        res.status(200).json(showSuccess("Employee details updated successfully", 200))
    } catch (error) {
        res.status(400).json(showError("Couldn't update the details of the employee with that ID", 400))
    }
}

export async function createEmployee(req, res, next) {
    try {
        const {name, role, salary, age, email} = req.body
        if (!name || !salary || !age || !email) {
            return res.status(400).json(showError("Missing fields", 400))
        }
        const data = await query(createEmployeeQuery, [name, email, age, role, salary])
        return res.status(201).json(showSuccess("Employee successfully created", data.rows[0], 201))
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(showError("Couldn't create that employee", 400)) 
    }
}