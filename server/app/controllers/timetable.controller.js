const db = require("../models");
const Timetable = db.timetable;
const Op = db.Sequelize.Op;

// Create and Save a new TimeTable for a grade
exports.create = (req, res) => {
    // Validate request
    if (!req.body.grade && !req.body.time && !req.body.day && !req.body.subject) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Timetable
    const timetable = {
      grade: req.body.grade,
      time: req.body.time,
      day: req.body.day,
      subject : req.body.subject
    };
  
    console.log(timetable);
    
    // Save Timetable in the database
    Timetable.create(timetable)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the TimeTable."
        });
      });
  };

// Retrieve all Timetables from the database.
exports.findAll = (req, res) => {
  
    Timetable.findAll()
      .then(data => {
        res.send({message: data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Timetables."
        });
      });
  };

// Find a single Timetable with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Timetable.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Timetable with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Timetable with id=" + id
        });
      });
  };

// Update a Timetable by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Timetable.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Timetable was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Timetable with id=${id}. Maybe Timetable was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Timetable with id=" + id
      });
    });
};

// Delete a Timetable with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Timetable.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Timetable was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Timetable with id=${id}. Maybe Timetable was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Timetable with id=" + id
        });
      });
  };


// Delete all Timetables from the database.
exports.deleteAll = (req, res) => {
    Timetable.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Timetables were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Timetables."
        });
      });
  };
