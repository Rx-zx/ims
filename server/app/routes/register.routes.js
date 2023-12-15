module.exports = app => {
    const user = require("../controllers/register.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", user.create);
  
    // Retrieve all Tutorials
    router.get("/", user.findAll);
  
    app.use('/api/user', router);
  };