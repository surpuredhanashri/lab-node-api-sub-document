const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const LessonRouter = require("./controller/lessonController")
const SquadRouter = require('./controller/squadController')

app.use(bodyParser.json())
app.use(cors({ origin: "*" }))

app.use('/lessons', LessonRouter)
app.use("/squad", SquadRouter)
app.listen(3000, () => console.log(`App listening on port 3000!`))