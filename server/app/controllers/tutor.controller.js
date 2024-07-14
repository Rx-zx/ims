const db = require("../models");
const { User, Tutor } = require('../models');
const bcrypt = require('bcryptjs');
const { log } = require("console");
const { check, validationResult } = require('express-validator');

exports.create = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, firstname, lastname, title , contact } = req.body;

  try {

      const existingUser = await User.findOne({ where: { email } });
      const existingTutor = await Tutor.findOne({ where: { firstname, lastname } });

      if (existingUser || existingTutor) {
        throw new Error('Email or Tutor already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newTutorData = async () => {

        const newUser = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
          user_type: "TUTOR",
        });

        const newTutor = await Tutor.create({
          firstname: firstname,
          lastname: lastname,
          title: title,
          contact: contact,
          userid: newUser.id
        });

        return newTutor

      }

      const result = await newTutorData();
      res.status(201).send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Tutor.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      data: rows,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutor.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find tutor with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving tutor with id=" + id
        });
      });
  };

// Update a tutor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "tutor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update tutor with id=${id}. Maybe tutor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating tutor with id=" + id
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const tutor = await Tutor.findByPk(id);
    const userId = tutor.userid;
    const user = await User.findByPk(userId);
    
    if (!user || !tutor) {
      return res.status(404).send({ message: `Cannot find User with id=${id}.` });
    }

    await Tutor.destroy({ where: { id } });
    await User.destroy({ where: { userId } });
    res.send({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: `Could not delete User with id=${id}: ${err.message}` });
  }
};

