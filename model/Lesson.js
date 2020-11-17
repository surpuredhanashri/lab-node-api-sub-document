const mongoose = require("../connection/connection")

const LessonSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Lesson = mongoose.model("lesson", LessonSchema)

module.exports = Lesson