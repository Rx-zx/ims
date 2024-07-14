module.exports = (app) => {
  const tutor = require("../controllers/tutor.controller.js");

  var router = require("express").Router();

  router.get("/all", tutor.findAll);

  router.get("/:id", tutor.findOne);

  router.post("/", tutor.create);

  app.use('/api/tutor', router);
};