module.exports = (app) => {
  const timetable = require("../controllers/timetable.controller.js");

  var router = require("express").Router();

  router.get("/all", timetable.findAll);

  router.get("/:id", timetable.findOne);

  router.delete("/:id", timetable.delete);

  router.post("/", timetable.create);

  app.use('/api/timetable', router);
};