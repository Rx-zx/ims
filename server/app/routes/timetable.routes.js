module.exports = (app) => {
    const timetable = require("../controllers/timetable.controller.js");
  
    var router = require("express").Router();

    router.post("/", timetable.create);

    router.get("/", timetable.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", timetable.findOne);

    // Update a Tutorial with id
    router.put("/:id", timetable.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", timetable.delete);
  
    // Create a new Tutorial
    router.delete("/", timetable.deleteAll);
  
    app.use('/api/timetable', router);
  };