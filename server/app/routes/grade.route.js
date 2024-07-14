module.exports = (app) => {
  
    var router = require("express").Router();
  
    const grade = require("../controllers/grade.controller");

    router.post("/", grade.create);
    
    router.get("/", grade.findAll);
    
    router.get("/:id", grade.findOne);
    
    router.put("/:id", grade.update);
    
    router.delete("/:id", grade.delete);
  
    app.use('/api/grade', router);
  };
