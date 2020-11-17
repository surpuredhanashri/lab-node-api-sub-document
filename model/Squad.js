const mongoose = require("../connection/connection")

const SquadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId },
    cohort: Number
})

const Squad = mongoose.model("squad", SquadSchema)

module.exports = Squad