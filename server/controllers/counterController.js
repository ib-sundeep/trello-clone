const Counter = require("../models/Counter");

const counterController = {
  find: function(req, res, next) {
    Counter.find()
      .exec()
      .then(counter => res.json(counter))
      .catch(err => next(err));
  },
  create: function(req, res, next) {
    const counter = new Counter();

    counter
      .save()
      .then(() => res.json(counter))
      .catch(err => next(err));
  },
  delete: function(req, res, next) {
    Counter.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(counter => res.json())
      .catch(err => next(err));
  },
  increment: function(req, res, next) {
    Counter.findById(req.params.id)
      .exec()
      .then(counter => {
        counter.count++;

        counter
          .save()
          .then(() => res.json(counter))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  },
  decrement: function(req, res, next) {
    Counter.findById(req.params.id)
      .exec()
      .then(counter => {
        counter.count--;

        counter
          .save()
          .then(() => res.json(counter))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
};

module.exports = counterController;
