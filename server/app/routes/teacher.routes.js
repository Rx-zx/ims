module.exports = (app) => {
    const teachers = require("../controllers/teacher.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", teachers.create);
  
    // Retrieve all teachers
    router.get("/", teachers.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", teachers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", teachers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", teachers.delete);
  
    // Create a new Tutorial
    router.delete("/", teachers.deleteAll);
  
    app.use('/api/teachers',router);
  };