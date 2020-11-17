const router = require("express").Router()
const Squad = require("../model/Squad")
const ObjectId = require("mongoose").Types.ObjectId

router.route("/")
    .get((req, res) => {
        Squad.find((err, squads) => {
            if (err) res.status(500).send("Error occured while fecthing data. Please try again later!")
            else {

                if (squads.length > 0) res.send(squads)
                else res.send("Add some data to fetch!")
            }
        })
    })
    .post((req, res) => {

        if (req.body.name && req.body.cohort) {

            const squad = new Squad({
                name: req.body.name,
                lessonId: req.body.lessonId,
                cohort: req.body.cohort
            })

            squad.save((err, squad) => {
                if (err) res.send(err)
                else {
                    res.status(200).json({ Added_New_Squad: squad })
                }
            })
        }
        else res.send("Please enter name and cohort 0f squad!")
    })


router.route("/:id")
    .get((req, res) => {
        const id = req.params.id

        if (ObjectId.isValid(id)) {

            Squad.findOne({ "_id": id }, (err, squad) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (squad) res.send(squad)
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

            const newSquad = {
                name: req.body.name,
                lessonId: req.body.lessonId,
                cohort: req.body.cohort
            }

            Squad.updateOne({ "_id": id }, newSquad, (err, response) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (response.nModified) res.redirect(`/squad/${id}`)
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
            Squad.deleteOne({ "_id": id }, (err, response) => {
                if (err) res.send("Error while deleting data. Please try again later")
                else {
                    if (response.deletedCount) res.send("Data was deleted successfully")
                    else if (response.n === 0) res.send("No Data found for specified Id")
                }
            })
        }
    })

module.exports = router