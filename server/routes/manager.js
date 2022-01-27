const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("../middlewares/passport");
const db = require("../models");
const router = express.Router();

router.get("/list", (req, res) => {
  db.User.findAll({ attributes: { exclude: ["password", "token"] } })
    .then((users) => res.json({ success: true, data: users }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

router.get("/:id", (req, res) => {
  db.User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "token"] },
  })
    .then((users) => res.json({ success: true, data: users }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

router.post(
  "/create",
  passport.authenticate("bearer", { session: false }),
  body("name").isLength({ min: 5 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }).trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.User.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
      role: req.body.role,
      status: req.body.status,
      token: bcrypt.genSaltSync(10),
    })
      .then((user) =>
        res.json({
          success: true,
          message: "New user has been created successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.put(
  "/update/:userId",
  passport.authenticate("bearer", { session: false }),
  body("name").isLength({ min: 5 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }).optional().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);

    const updates = {
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      status: req.body.status,
    };
    if (req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, salt);
      updates.password = hash;
    }

    db.User.update(updates, { where: { id: req.params.userId } })
      .then((user) =>
        res.json({
          success: true,
          message: "User has been updated successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.delete(
  "/delete/:userId",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.User.findOne({
      where: { id: req.params.userId },
    })
      .then((user) => {
        if (user instanceof db.User !== true)
          return res.json({ succes: false, message: "User not found" });
        user.destroy();
        res.json({
          success: true,
          message: "The user has been deleted.",
        });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;
