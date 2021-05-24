const dotenv = require('dotenv');
const Pool = require('pg').Pool //Pool manages a dynamic list/pool of Client objects, with automatic re-connect functionality
const format = require('pg-format');
const fastcsv = require("fast-csv");

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getUserInitialData = async (request, response) => {
    const version = request.params.version

    const experimentCount = await pool.query('SELECT * FROM view_participants_count')
    const navScreens = await pool.query('SELECT * FROM view_screens_x_version where version_name=$1', [version])

    const result = { experimentCount: experimentCount.rows, screens: navScreens.rows }
    // console.log(result)
    response.status(200).json(result)
}

const getVersions = (request, response) => {
    pool.query('SELECT * FROM view_experiment_versions', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAppTextData = (request, response) => {
    const sex = request.params.sex

    pool.query('SELECT * from view_text_x_screens WHERE sex = $1', [sex], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMemoryTaskResults = (request, response) => {
    pool.query('SELECT * from view_visual_pattern', (error, results) => {
        if (error) {
            throw error
        }

        const jsonData = JSON.parse(JSON.stringify(results.rows));

        response.header('Content-Type', 'text/csv');
        response.attachment('task_result.csv');
        fastcsv
            .write(jsonData, { headers: true })
            .pipe(response)
            .on("finish", function () {
                console.log("Write to CSV completed successfully!");
            });
    })
}

const createVisualPattern = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_visualpattern (user_id, screen_name, level, matrix_dimention, matrix, matrix_result, correct_tiles, incorrect_tiles, missing_tiles, retry, time_spent_in_screen) VALUES %L Returning *', data)

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserVisualPattern added  ${results.rowCount} rows`)
        // console.log(`UserVisualPattern added  ${results.rows} rows`)
        response.status(201).send(`UserVisualPattern added ${results.rowCount} rows`)
    })
}

const createUserInfo = (request, response) => {
    const { info, form } = request.body

    let query1 = format('INSERT INTO results_user_info (user_id, os_name, os_version, browser_name, browser_version, browser_major, browser_language, engine_name, engine_version, screen_width, screen_height) VALUES %L Returning *;', info);

    let query2 = format('INSERT INTO results_user_form (user_id, ariadna_user_id, sex, age, profession, years_education, level_education, version_task) VALUES %L Returning *;', form);

    // console.log(query1 + query2)

    pool.query(query1 + query2, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserInfo and UserForm added  ${results.rowCount} rows`)
        // console.log(`UserInfo and UserForm added  ${results.rows} rows`)
        response.status(201).send(`UserInfo and UserForm added ${results.rowCount} rows`)
    })
}

const createUserLogTime = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_logtime (user_id, screen_name, timestamp, time_spent_in_screen) VALUES %L Returning *', data);

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserLog added  ${results.rowCount} rows`)
        // console.log(`UserLog added  ${results.rows} rows`)
        response.status(201).send(`UserLog added ${results.rowCount} rows`)
    })
}

const createUserGeneraldata = (request, response) => {
    const data = request.body

    const query = format('INSERT INTO results_user_general_data (column1, column2, column3, column4, column5, column6, column7,column8, column9, column10, column11, column12, column13) VALUES %L Returning *', data);

    // console.log(query)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        // console.log(`UserGeneraldata added  ${results.rowCount} rows`)
        // console.log(`UserGeneraldata added  ${results.rows} rows`)
        response.status(201).send(`UserGeneraldata added ${results.rowCount} rows`)
    })
}

module.exports = {
    getUserInitialData,
    getVersions,
    getAppTextData,
    getMemoryTaskResults,
    createVisualPattern,
    createUserInfo,
    createUserLogTime,
    createUserGeneraldata
}
