const router = require("express").Router()
const Lesson = require("../model/Lesson")
const ObjectId = require("mongoose").Types.ObjectId

router.route("/")
    .get((req, res) => {
        Lesson.find((err, lessons) => {
            if (err) res.status(500).send("Error occured while fecthing data. Please try again later!")
            else {

                if (lessons.length > 0) res.send(lessons)
                else res.send("Add some data to fetch!")
            }
        })
    })
    .post((req, res) => {

        if (req.body.name) {
            const lesson = new Lesson({
                name: req.body.name
            })

            lesson.save((err, lesson) => {
                if (err) res.send("Error while saving data please try again later!")
                else {
                    res.status(200).json({ Added_New_Lesson: lesson })
                }
            })
        }
        else res.send("Please enter name of lesson!")
    })


router.route("/:id")
    .get((req, res) => {
        const id = req.params.id

        if (ObjectId.isValid(id)) {

            Lesson.findOne({ "_id": id }, (err, lesson) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (lesson) res.send(lesson)
                    else res.send("No data present for specified id!")
                }
            })
        }
        else res.status(404).send("Invalid Id. Please try again using valid id.")
    })
    .put((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.status(404).send("Invalid Id. Please try again using valid id.")
        else {

            const newLesson = {
                name: req.body.name
            }

            Lesson.updateOne({ "_id": id }, newLesson, (err, response) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (response.nModified) res.redirect(`/lessons/${id}`)
                    else if (response.n === 0) res.send("No Data found for specified Id")
                    else res.send("There was nothing to change")
                }
            })
        }
    })
    .delete((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.status(404).send("Invalid Id. Please try again using valid id.")
        else {
            Lesson.deleteOne({ "_id": id }, (err, response) => {
                if (err) res.send("Error while deleting data. Please try again later")
                else {
                    if (response.deletedCount) res.send("Data was deleted successfully")
                    else if (response.n === 0) res.send("No Data found for specified Id")
                }
            })
        }
    })



module.exports = router
