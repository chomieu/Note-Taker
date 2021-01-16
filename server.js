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

app.get("/api/notes", (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        if (err) throw err
        const parsed = JSON.parse(data)
        for (i = 0; i < parsed.length; i++) {
            parsed[i].id = i + 1
        }
        fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
            if (err) throw err
        })
        return res.json(parsed)
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        if (err) throw err
        const parsed = JSON.parse(data)
        parsed.push(req.body)
        for (i = 0; i < parsed.length; i++) {
            parsed[i].id = i + 1
        }
        fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
            if (err) throw err
        })
        return res.json(parsed)
    })
})

app.delete("/api/notes/:id", (req, res) => {
    const chosen = parseInt(req.params.id) - 1
    fs.readFile("./db.json", (err, data) => {
        if (err) throw err
        const parsed = JSON.parse(data)
        parsed.splice(chosen, 1)
        fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
            if (err) throw err
        })
        return res.json(parsed)
    })
})

app.listen(PORT)