const { Classroom } = require('../models');
const { check, validationResult } = require('express-validator');


exports.validate = (method) => {
  switch (method) {
    case 'createClasroom':
    case 'updateClasroom': {
      return [
        check('name', 'Name is required').notEmpty()
      ];
    }
  }
};


exports.create = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name , capacity } = req.body;

  try {
    const Classroom = await Classroom.create({ name, capacity });
    res.status(201).send(Classroom);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({
        message: 'Classroom name already exists.'
      });
    } else {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Classroom.'
      });
    }
  }
};


exports.findAll = async (req, res) => {
  try {
    const Classrooms = await Classroom.findAll();
    res.status(200).send(Classrooms);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Classrooms.'
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const Classroom = await Classroom.findByPk(id);
    if (!Classroom) {
      return res.status(404).send({ message: `Cannot find Classroom with id=${id}.` });
    }
    res.status(200).send(Classroom);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Classroom with id=${id}`
    });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name , capacity} = req.body;

  try {
    const Classroom = await Classroom.findByPk(id);
    if (!Classroom) {
      return res.status(404).send({ message: `Cannot find Classroom with id=${id}.` });
    }

    await Classroom.update({ name, capcity });
    res.status(200).send({ message: "Classroom was updated successfully." });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({
        message: 'Classroom name already exists.'
      });
    } else {
      res.status(500).send({
        message: `Error updating Classroom with id=${id}`
      });
    }
  }
};


exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const Classroom = await Classroom.findByPk(id);
    if (!Classroom) {
      return res.status(404).send({ message: `Cannot find Classroom with id=${id}.` });
    }

    await Classroom.destroy();
    res.status(200).send({ message: "Classroom was deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Classroom with id=${id}`
    });
  }
};
