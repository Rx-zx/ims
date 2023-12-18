module.exports = (app) => {
    const user = require("../controllers/register.controller.js");
  
    var router = require("express").Router();

    router.get("/all", user.findAll);
  
    app.use('/api/user', router);
  };