const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const helpers = require('../helpers/validations');



// Number of rounds to generate the salt (the higher the number, the more secure but slower)
const saltRounds = 5;

// Create and Save a new Users
exports.create = async (req, res) => {

  if(! helpers.isValidObject(req.body)){
    res.status(200).send({message : "Input is invalid. Some elements are null or empty."})
  }

  // Hash the password synchronously
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)

  const existingUser =  await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  
  if (existingUser) {
    return res.status(200).send({ message: "User with this email already exists. Try with another email." });
  }

  // Create a Users
  const user = {
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email ,
    user_type: req.body.user_type
  };
  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    })
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
    User.findAll()
      .then(data => {
        res.send({data: data});
      })
      .catch(err => {
        res.status(500).send({
          data:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Users with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };


// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} User were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };