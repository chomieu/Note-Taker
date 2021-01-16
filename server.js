const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.all(`/api/notes(/:id)?`, (req, res) => {
    handler(req, res)
})

// app.delete("/api/notes/:id", (req, res) => {
//     handler(req, res)
// })

function handler(req, res) {
    fs.readFile("./db.json", (err, data) => {
        if (err) throw err
        const parsed = JSON.parse(data)
        switch (req.method) {
            case "GET":
                for (i = 0; i < parsed.length; i++) { parsed[i].id = i + 1 }
                break
            case "POST":
                parsed.push(req.body)
                break
            case "DELETE":
                parsed.splice(parseInt(req.params.id) - 1, 1)
                break
        }
        fs.writeFile("./db.json", JSON.stringify(parsed), (err) => { if (err) throw err })
        res.json(parsed)
    })
}

app.listen(PORT)