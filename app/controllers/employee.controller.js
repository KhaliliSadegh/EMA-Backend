var db = require("../models");
var User = db.user;
var Role = db.role;
var bcrypt = require("bcryptjs");
var success = 0
var failed = 0
// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.value) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  var employees = JSON.parse(req.body.value);
  var users = []
  employees.forEach((item) => {
    item.roles = []
    db.role.findOne({ name: "admin" }, (err, role) => {
      if (err) {
        failed = failed + 1
        return
      }

      item.roles.push(role._id);

    });

    users.push(new User({
      username: item.Vorname + '.' + item.Nachname,
      password: bcrypt.hashSync('DEFAULTPASSWORD', 8),
      firstname: item.Vorname,
      lastname: item.Nachname,
      street: item.Strasse,
      nr: item.Nr,
      plz: item.PLZ,
      ort: item.Ort,
      country: item.Land,
      position: item.Rolle,
      roles: item.roles
    }));
  });
  db.user.insertMany(users, { ordered: false }).then(function (result) {
    res.send({ success: result.length, failed: employees.length - result.length });

  }).catch(function (err) {
    res.send({ success: err.insertedDocs.length, failed: employees.length - err.insertedDocs.length });
  });


};

// Retrieve all employee from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });
};

// Update a employee by the id in the request
exports.update = (req, res) => {
  console.log(req.body)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, { $set: req.body }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({ message: "Employee was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

exports.addcomment = (req, res) => {
  console.log(req.body)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, { $push: { comments: { comment: req.body.comment, author: req.body.author } } }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({ message: "Employee was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};
// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    });
};

