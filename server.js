const express = require("express")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("/notes", function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`)
})