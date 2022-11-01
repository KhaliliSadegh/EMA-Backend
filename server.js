const express = require("express");
const cors = require("cors");
const Config = require("./app/config/app.config");
const { appLogger } = require('./utils/logger');
var bcrypt = require("bcryptjs");

const app = express();
const db = require("./app/models");
const Role = db.role;
const User = db.user;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



db.mongoose
  .connect(`mongodb://${Config.HOST}:${Config.PORT}/${Config.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    bufferMaxEntries: 0
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Badumts application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  var admin_roleid;

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err, role) => {
        if (err) {
          console.log("error", err);
        }
        admin_roleid = role._id;
        console.log("added 'admin' to roles collection");
        const user = new User({
          username: Config.ADMIN_USERNAME,
          firstname: Config.ADMIN_NAME,
          email: Config.ADMIN_EMAIL,
          lastname: Config.ADMIN_Family,
          position: Config.ADMIN_POSITION,
          password: bcrypt.hashSync(Config.ADMIN_PASSWORD, 8),
          roles: [admin_roleid]
        });
        user.save((err, user) => {
          if (err) {
            console.log("error", err);
            return
          }
          appLogger.info("admin user added to users collection");
        }
        );
      });
    }
  });
}
