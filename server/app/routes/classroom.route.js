module.exports = (app) => {
  
    var router = require("express").Router();
  
    const classroom = require("../controllers/classroom.controller");

    router.post("/", classroom.create);
    
    router.get("/", classroom.findAll);
    
    router.get("/:id", classroom.findOne);
    
    router.put("/:id", classroom.update);
    
    router.delete("/:id", classroom.delete);
  
    app.use('/api/classroom', router);
  };
