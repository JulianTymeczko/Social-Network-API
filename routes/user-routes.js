const mongoose = require("mongoose");
const User = mongoose.model("User");
const Thought = mongoose.model("Thought");
const router = require("express").Router();

router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({ username: req.body.username, email: req.body.email })
    .then(() => {
      res.status(201).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    { username: req.body.username, email: req.body.email }
  )
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Update failed");
      }
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Delete failed");
      }
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/:userId/friends/:friendId", (req, res) => {
  User.updateOne(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } }
  )
    .then((result) => {
      if (!result.acknowledged) {
        throw new Error("Failed to add friend");
      }
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:userId/friends/:friendId", (req, res) => {
  User.updateOne(
    { _id: req.params.userId },
    {
      $pull: {
        friends: req.params.friendId,
      },
    }
  );
});

module.exports = router;