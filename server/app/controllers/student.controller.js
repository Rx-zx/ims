
const { User, Student } = require('../models');
const bcrypt = require('bcryptjs');
const { log } = require("console");
const { check, validationResult } = require('express-validator');

// Validation rules
exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        check('firstname', 'firstname is required').notEmpty(),
        check('lastname', 'lastname is required').notEmpty(),
        check('grade', 'grade is required').notEmpty(),
        check('contact', 'contact is required').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
      ];
    }
  }
};

exports.findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Student.findAndCountAll({
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


exports.create = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, firstname, lastname, grade, contact } = req.body;

  try {

    const existingUser = await User.findOne({ where: { email } });
    const existingStudent = await Student.findOne({ where: { firstname, lastname }});

    if (existingUser || existingStudent) {
      throw new Error('Email or Student already exists');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudentData = async () => {

      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        user_type: "STUDENT",//
      });

      const newStudent = await Student.create({
        firstname: firstname,
        lastname: lastname,
        grade: grade,
        contact: contact,
        userid: newUser.id
      });

      return newStudent;
      }

    const result = await newStudentData();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student with id=" + id
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
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).send({ message: `Cannot find Student with id=${id}.` });
    }

    const userid = student.userid;
    const user = await User.findByPk(userid);
    
    if (!user) {
      return res.status(404).send({ message: `Cannot find User with id=${userid}.` });
    }

    await Student.destroy({ where: { id } });
    await User.destroy({ where: { id: userid } });

    res.send({ message: "User was deleted successfully!", student });

  } catch (err) {
    res.status(500).send({ message: `Could not delete User with id=${id}: ${err.message}` });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id; // assuming id is passed as a route parameter
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, firstname, lastname, title, contact } = req.body;

  try {
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).send({ message: `Cannot find Student with id=${id}.` });
    }

    const user = await User.findByPk(student.userid);
    
    if (!user) {
      return res.status(404).send({ message: `Cannot find User with id=${tutor.userid}.` });
    }

    const existingUser = await User.findOne({ where: { email } });
    const existingStudent = await Student.findOne({ where: { firstname, lastname } });

    if ((existingUser && existingUser.id !== user.id) || (existingStudent && existingStudent.id !== student.id)) {
      throw new Error('Email or Tutor name already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
    });

    await student.update({
      firstname: firstname || student.firstname,
      lastname: lastname || student.lastname,
      grade: grade || student.grade,
      contact: contact || student.contact,
    });

    res.status(200).send({ message: "Student was updated successfully!", student, user });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while updating the Tutor.'
    });
  }
};
