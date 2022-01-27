const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../models");
const passport = require("../middlewares/passport");
const router = express.Router();

router.get(
  "/list",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findAll()
      .then((products) => res.json({ success: true, data: products }))
      .catch((err) => res.json({ succes: false, message: err.message }));
  }
);

router.get(
  "/:productId",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findOne({ where: { id: req.params.productId } })
      .then((product) => {
        if (product instanceof db.Product !== true)
          res.json({ success: false, message: "Product not found" });
        res.json({ success: true, data: product });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.post(
  "/create",
  passport.authenticate("bearer", { session: false }),
  body("model").isLength({ min: 2 }).trim().escape(),
  body("color").not().isEmpty().trim().escape(),
  body("location").isLength({ max: 50 }).not().isEmpty().trim().escape(),
  body("rating").isNumeric(),
  body("isAvailable").isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    db.Product.create({
      model: req.body.model,
      color: req.body.color,
      location: req.body.location,
      rating: req.body.rating,
      isAvailable: req.body.isAvailable,
    })
      .then((user) =>
        res.json({
          success: true,
          message: "The product has been created successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.put(
  "/update/:productId",
  passport.authenticate("bearer", { session: false }),
  body("model").isLength({ min: 2 }).trim().escape(),
  body("color").not().isEmpty().trim().escape(),
  body("location").isLength({ max: 50 }).not().isEmpty().trim().escape(),
  body("rating").isNumeric(),
  body("isAvailable").isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ succes: false, errors: errors.array() });

    db.Product.findOne({ where: { id: req.params.productId } })
      .then((product) => {
        if (product instanceof db.Product !== true)
          res.json({ succes: false, message: "Product not found" });
      })
      .catch((err) => res.json({ succes: false, message: err.message }));

    db.Product.update(
      {
        model: req.body.model,
        color: req.body.color,
        location: req.body.location,
        rating: req.body.rating,
        isAvailable: req.body.isAvailable,
      },
      { where: { id: req.params.productId } }
    )
      .then((result) =>
        res.json({
          success: true,
          message: "The product has been updated successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.delete(
  "/delete/:productId",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findOne({ where: { id: req.params.productId } })
      .then((product) => {
        if (product instanceof db.Product !== true)
          return res.json({ success: false, message: "Product not found" });

        product.destroy();

        res.json({
          success: true,
          message: `Product has been deleted`,
        });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;
