const Todo = require('../../models/Todo');

module.exports = (app) => {
  app.get('/api/todos', (req, res, next) => {
    Todo.find()
      .exec()
      .then((todos) => res.json(todos))
      .catch((err) => next(err));
  });

  app.post('/api/todos', (req, res, next) => {
    const todo = new Todo(req.body);

    todo.save()
      .then(() => res.json(todo))
      .catch((err) => next(err));
  });

  app.delete('/api/todos/:id', (req, res, next) => {
    Todo.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((todo) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/todos/:id', (req, res, next) => {
    Todo.findById(req.params.id)
      .exec()
      .then((todo) => {
        todo.text = req.body.text;
        todo.completed = req.body.completed;

        todo.save()
          .then(() => res.json(todo))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
