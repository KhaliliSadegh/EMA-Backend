const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const employee = require("../controllers/employee.controller.js");

var router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

 

  // Create a new Employee
  app.post("/api/employee", employee.create);

  // Retrieve all Employees
  app.get("/api/employee", [authJwt.verifyToken], employee.findAll);

  // Retrieve a single employee with id
  app.get("/api/employee/:id", [authJwt.verifyToken], employee.findOne);

  // Update a employee with id
  app.put("/api/employee/:id", [authJwt.verifyToken], employee.update);

  // Post a comment 
  app.put("/api/employee/addcomment/:id", [authJwt.verifyToken], employee.addcomment);


  // Delete a employee with id
  app.delete("/api/employee/:id", [authJwt.verifyToken], employee.delete);

  // delete all employees
  app.delete("/api/employee/", [authJwt.verifyToken], employee.deleteAll);

};
