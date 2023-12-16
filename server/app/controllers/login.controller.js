const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers/validations');
require('dotenv')

// Login
exports.login = async (req, res) => {

    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
        res.status(400).send("Enter correct email & password");
        
    }
    const user = await User.findOne({
        where: { email: email }
      });
    
    if (user && ( bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email:user.email, user_type :user.user_type },
          process.env.SECRET_KEY,
          {
            expiresIn: "2m",
          }
        );

        user.token = token;

        res.status(200).json({ message: 'Login endpoint reached', token: token , user: user});
    }
    else{
        res.status(400).send("Invalid Credentials");
    }
    
};
