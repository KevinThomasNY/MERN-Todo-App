const express = require("express");
const Todo = require("../models/todo");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  Todo.find({ user: req.user._id }).then((todos) => {
    res.json(todos);
  });
});

router.post("/", (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    user: req.user._id,
  });

  todo.save().then((todo) => {
    res.json(todo);
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.task = req.body.task;
    todo.completed = req.body.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: "Todo deleted" });
  });
});

module.exports = router;
