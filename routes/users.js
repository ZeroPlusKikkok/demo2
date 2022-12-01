const express = require('express');
const router = express.Router();

const User = require('../models/user')

// List All
router.get('/list', (req, res, next) => {
  User.find()
    .then((data) => {
      res.send(data);
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
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      res.send(data);
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
  const newUser = new User({
    idUser: req.body.idUser,
    fName: req.body.fName,
    lName: req.body.lName,
    username: req.body.username,
    password: req.body.password
  });
  newUser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
});

// Update
router.put('/update/:id', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      idUser: req.body.idUser,
      fName: req.body.fName,
      lName: req.body.lName,
      username: req.body.username,
      password: req.body.password
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.id,
        });
      }
      res.send(data);
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
  User.findByIdAndRemove(req.params.id)
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
