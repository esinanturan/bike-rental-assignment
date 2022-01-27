const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../models");

router.post(
  "/register",
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
      role: 1,
      status: 1,
      token: bcrypt.genSaltSync(10),
    })
      .then((user) =>
        res.json({
          success: true,
          message: "You have been registered successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user instanceof db.User)
          return res.json({ success: false, message: "User not found" });

        const result = bcrypt.compareSync(req.body.password, user.password);
        res.json({
          success: result,
          data: result ? { ...user.toJSON(), password: undefined } : null,
        });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;

// passport.authenticate("bearer", { session: false }),
// const passport = require("../middlewares/passport");
