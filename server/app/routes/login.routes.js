module.exports = (app) => {
    const user = require("../controllers/login.controller");
  
    var router = require("express").Router();

    router.post("/", user.login);

    app.use("/login",router);
  };