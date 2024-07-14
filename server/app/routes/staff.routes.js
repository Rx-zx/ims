module.exports = (app) => {
  const staff = require("../controllers/staff.controller.js");

  var router = require("express").Router();

  router.get("/all", staff.findAll);

  router.get("/:id", staff.findOne);

  router.delete("/:id", staff.delete);

  router.post("/", staff.create);

  app.use('/api/staff', router);
};