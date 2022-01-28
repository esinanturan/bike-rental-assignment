const express = require("express");
const { body, validationResult } = require("express-validator");
const passport = require("../middlewares/passport");
const db = require("../models");
const router = express.Router();

router.post(
  "/:productId",
  passport.authenticate("bearer", { session: false }),
  body("productId").isNumeric().trim().escape(),
  body("rating").isNumeric().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    db.Rating.create({
      productId: req.body.productId,
      userId: req.user?.id,
      rate: req.body.rating,
    })
      .then((rating) =>
        res.json({
          success: true,
          message: "The product has  been rated successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;
