module.exports = (app) => {
  
    var router = require("express").Router();
  
    const subject = require("../controllers/subject.controller");

    router.post("/", subject.create);
    
    router.get("/", subject.findAll);
    
    router.get("/:id", subject.findOne);
    
    router.put("/:id",  subject.update);
    
    router.delete("/:id", subject.delete);
  
    app.use('/api/subject', router);
  };
