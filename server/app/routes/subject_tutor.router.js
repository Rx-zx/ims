module.exports = (app) => {
    const subject_tutor = require("../controllers/subject_tutor.controller.js");
  
    var router = require("express").Router();
  
    router.get("/all", subject_tutor.findAll);
  
    router.get("/:id", subject_tutor.findOne);
  
    router.delete("/:id", subject_tutor.delete);
  
    router.post("/", subject_tutor.create);
  
    app.use('/api/subject-tutor', router);
  };