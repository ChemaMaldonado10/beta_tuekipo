// will contain all my users routes
const mysql = require('mysql')
const express = require('express')
const router = express.Router()


// Create an user from a post form html
router.post("/user_create", (req, res) => {
    console.log("Creating a new user...")
    const first_name = req.body.first_name
    const last_name = req.body.last_name

    const sql = " INSERT INTO users (first_name, last_name) VALUES (?,?)"
    getConnection().query(sql, [first_name, last_name], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted new user succesfully", results.insertId)
        res.end()
    })
})

// list all users
router.get("/users", (req, res) => {
    const conn = getConnection()

    const userId = req.params.id
    const sql = "SELECT * FROM users"
    conn.query(sql, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500).json
            return
        }
        console.log("Fetching users...")
        res.json(rows)
    })
})

// Fetch an user from its id
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const conn = getConnection()

    const userId = req.params.id
    const sql = "SELECT * FROM users WHERE id = ?"
    conn.query(sql, [userId], (err, rows, fields) => {
            if (err) {
                console.log("Failed to query for users: " + err)
                res.sendStatus(500).json
                return
            }
            console.log("Fetching user..")
            res.json(rows)
        })
        //res.end()
})


// Update info of an user. It could be route.put simply changing
// post --> put
router.post('/update_user', (req, res) => {

    console.log("Updating user...")
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const id = req.body.id

    const sql = " UPDATE users SET first_name = ?, last_name = ? WHERE id = ?"
    getConnection().query(sql, [first_name, last_name, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Updating user succesfully", results.insertId)
        res.end()
    })
})

// Delete an user by its id. It could be a route.delete simply changing
// get --> delete
router.get('/delete_user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id + "to be deleted")

    const conn = getConnection()

    const userId = req.params.id
    const sql = "DELETE FROM users WHERE id = ?"
    conn.query(sql, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to delete the user: " + err)
            res.sendStatus(500).json
            return
        }
        console.log("Deleting user..")
        res.json("Result : deleted")
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: 'root',
    password: "mysql191312",
    database: 'mysql_database'
})

function getConnection() {
    return pool
}

module.exports = router