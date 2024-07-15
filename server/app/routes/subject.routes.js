module.exports = (app) => {
  const subject = require("../controllers/subject.controller.js");

  var router = require("express").Router();

  router.get("/all", subject.findAll);

  router.get("/:id", subject.findOne);

  router.delete("/:id", subject.delete);

  router.post("/", subject.create);

  app.use('/api/subject', router);
};