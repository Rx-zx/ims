module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  var router = require("express").Router();

  router.get("/all", student.findAll);

  router.get("/:id", student.findOne);

  router.delete("/:id", student.delete);

  router.post("/", student.create);

  app.use('/api/student', router);
};