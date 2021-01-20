// Include dependencies
const express = require("express")
const path = require("path")
const fs = require("fs")

// Set up the express app and port
const app = express()
const PORT = process.env.PORT || 8080

// Handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Specifies root directory and makes index.html file the home page
app.use(express.static("public"))

// Sends user to the note page
app.get("/notes", (req, res) => { res.sendFile(path.join(__dirname + "/public/notes.html")) })

// Handles all resquests and responses for the API routes
// Reads, updates, and re-writes db.json file based on the type of request received
app.all(`/api/notes(/:id)?`, (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        if (err) throw err
        const parsed = JSON.parse(data)
        switch (req.method) {
            case "GET": // Adds an id to each note entry
                for (i = 0; i < parsed.length; i++) { parsed[i].id = i + 1 }
                break
            case "POST": // Saves new note entry
                parsed.push(req.body)
                break
            case "DELETE": // Deletes selected note entry
                parsed.splice(parseInt(req.params.id) - 1, 1)
                break
        }
        fs.writeFile("./db.json", JSON.stringify(parsed), (err) => { if (err) throw err })
        res.json(parsed)
    })
})

// Starts the server
app.listen(PORT)