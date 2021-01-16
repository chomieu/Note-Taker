const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "db.json", function (err, data) {
        err ? console.error(err) : console.log("success")
        res.json(JSON.parse(data))
    })
})

app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`)
})