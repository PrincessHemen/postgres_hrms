export const createRoleQuery = `
    CREATE TYPE role_type AS 
    ENUM ('Manager', 'HR', 'Developer', 'Sales', 'Intern')
`

export const createEmployeeTableQuery = `

    CREATE TABLE employee_details(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK (age > 18),
        role role_type NOT NULL DEFAULT 'Intern',
        salary DECIMAL (8,2) NOT NULL
    )

`
//COALESCE checks if a value has been passed for that parameter. If yes, it uses the passed value. If not, then it uses the default put in after the comma.

export const getAllEmployeesQuery = `
    SELECT * FROM employee_details
`

export const createEmployeeQuery = `
    INSERT INTO employee_details(name, email, age, role, salary)
    VALUES($1, $2, $3, COALESCE($4::role_type, 'Intern'::role_type), $5) RETURNING * 
`

export const getEmployeeQuery = `
    SELECT * FROM employee_details WHERE id = $1
`

export const deleteEmployeeQuery = `
    DELETE FROM employee_details WHERE id = $1
`

//In this case, the 'default value' in COALESCE is the previous name of the employee before edit was clicked

export const updateEmployeeQuery = `
    UPDATE employee_details
    SET 
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    age = COALESCE($3, age),
    role = COALESCE($4, role),
    salary = COALESCE($5, salary) 
    WHERE id = $6
    RETURNING * 
`

