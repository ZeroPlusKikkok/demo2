const express = require('express');
const router = express.Router();

const Employee = require('../../models/employee')

// List All
router.get('/list', (req, res, next) => {
  Employee.find()
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving messages.",
      });
    });
});

// List One by Id
router.get('/list/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.id,
      });
    });
});

// Create
router.post('/create', (req, res, next) => {
  const newEmployee = new Employee({
    idCard: req.body.idCard,
    fName: req.body.fName,
    lName: req.body.lName,
    position: req.body.position,
    section: req.body.section,
    deparetment: req.body.deparetment,
    dateStart: req.body.dateStart,
    iMage: req.body.iMage
  });
  newEmployee
    .save()
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
});

// Update
router.put('/edit/:id', (req, res, next) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      idCard: req.body.idCard,
      fName: req.body.fName,
      lName: req.body.lName,
      position: req.body.position,
      section: req.body.section,
      deparetment: req.body.deparetment,
      dateStart: req.body.dateStart,
      iMage: req.body.iMage
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.id,
      });
    });
});

// Delete
router.delete('/delete/:id', (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.id,
      });
    });
});

module.exports = router;
