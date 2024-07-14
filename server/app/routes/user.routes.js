module.exports = (app) => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    router.get("/all", user.findAll);

    router.get("/:id", user.findOne);
  
    app.use('/api/user', router);
  };