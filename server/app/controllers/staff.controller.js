const db = require("../models");
const { User, Staff } = require('../models');
const bcrypt = require('bcryptjs');
const { log } = require("console");
const { check, validationResult } = require('express-validator');

// Validation rules
exports.validate = (method) => {
  switch (method) {
    case 'createStaff': {
      return [
        check('firstname', 'firstname is required').notEmpty(),
        check('username', 'username is required').notEmpty(),
        check('lastname', 'lastname is required').notEmpty(),
        check('title', 'title is required').notEmpty(),
        check('position', 'position is required').notEmpty(),
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

    const { count, rows } = await Staff.findAndCountAll({
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
    console.log(2434234234);
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, firstname, lastname, title, contact, position } = req.body;

  try {

      const existingUser = await User.findOne({ where: { email } });
      const existingStaff = await Staff.findOne({ where: { firstname, lastname } });

      if (existingUser || existingStaff) {
        throw new Error('Email or Staff already exists');
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      const newStaffData = async () => {

        const newUser = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
          user_type: "STAFF",
        });

        const newStaff = await Staff.create({
          firstname: firstname,
          lastname: lastname,
          position: position,
          title: title,
          contact: contact,
          userid: newUser.id
        });

        return newStaff

      }

      const result = await newStaffData();


    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Staff.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find staff with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving staff with id=" + id
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

   async () => {
    const staff = await Staff.findByPk(id);
    const userid = staff.userid;
    const user = await User.findByPk(userid);
    
    if (!staff) {
      return res.status(404).send({ message: `Cannot find User with id=${id}.` });
    }

    await Staff.destroy({ where: { id } });
console.log(user);
    await User.destroy({ where: { id :userid } });
    

    return staff;
  }
    
    res.send({ message: "User was deleted successfully!"  });
  
  } catch (err) {
    res.status(500).send({ message: `Could not delete User with id=${id}: ${err.message}` });
  }
};