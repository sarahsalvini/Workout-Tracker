const db = require("../models");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    db.Workout.find({}).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    });
  });

  app.put("/api/workouts/:id", function(req, res) {
    let id = req.params.id;
    db.Workout.findOneAndUpdate(
      { _id: id },
      { $push: { exercises: req.body } },
      function(error, success) {
        if (error) {
          console.log(error);
        } else {
          res.send(success);
        }
      }
    );
  });

  app.post("/api/workouts", function(req, res) {
    console.log(req.body);
    db.Workout.create(req.body).then(function(dbWorkouts) {
      db.Workout.findOneAndUpdate(
        { _id: dbWorkouts._id },
        { $push: { exercises: req.body } },
        function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
      res.json(dbWorkouts);
    });
  });

  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find({}).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    });
  });
};
