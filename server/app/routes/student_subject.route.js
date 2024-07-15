module.exports = (app) => {
    const student_subject = require("../controllers/student_subject.controller");
  
    var router = require("express").Router();
  
    router.get("/all", student_subject.findAll);
  
    router.get("/:id", student_subject.findOne);
  
    router.delete("/:id", student_subject.delete);
  
    router.post("/", student_subject.create);
  
    app.use('/api/student-subject', router);
  };