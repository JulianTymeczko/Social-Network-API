const mongoose = require("mongoose");
const User = mongoose.model("User");
const Thought = mongoose.model("Thought");
const router = require("express").Router();

router.get("/", (req, res) => {
  Thought.find({})
    .then((thoughts) => {
      res.status(200).json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Thought.findById(req.params.id)
    .then((thought) => {
      res.status(200).json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Thought.create({
    thoughtText: req.body.thoughtText,
    username: req.body.username,
  })
    .then((thought) => {
      return User.updateOne(
        { _id: req.body.userId },
        { $push: { friends: thought._id } }
      );
    })
    .then(() => {
      res.status(201).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Thought.updateOne(
    { _id: req.params.id },
    { username: req.body.username, thoughtText: req.body.thoughtText }
  )
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Failed to update Thought");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Thought.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Failed to delete Thought");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/:thoughtId/reactions", (req, res) => {
  Thought.updateOne(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.body } }
  )
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Failed to add reaction to Thought");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
  Thought.updateOne(
    { _id: req.params.thoughtId },
    { $pull: { reactions:  { _id: req.params.reactionId } } }
  )
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Failed to delete reaction from Thought");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;