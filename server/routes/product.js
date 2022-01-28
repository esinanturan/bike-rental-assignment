const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../models");
const passport = require("../middlewares/passport");
const router = express.Router();

router.get(
  "/list",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findAll({
      include: [
        {
          model: db.Rating,
          required: false,
        },
      ],
    })
      .then((products) => {
        const mappedProducts = products.map((product) => ({
          ...product.toJSON(),
          rating:
            product.Ratings.reduce((acc, curr) => (acc += curr.rate), 0) /
            product.Ratings.length,
        }));
        res.json({ success: true, data: mappedProducts });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.get(
  "/all",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findAll({
      include: [
        {
          model: db.Rating,
          required: false,
        },
      ],
    })
      .then((products) => {
        const mappedProducts = products.map((product) => ({
          ...product.toJSON(),
          rating:
            product.Ratings.reduce((acc, curr) => (acc += curr.rate), 0) /
            product.Ratings.length,
        }));
        res.json({ success: true, data: mappedProducts });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.get(
  "/:productId",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Product.findOne({
      where: { id: req.params.productId },
      include: [
        {
          model: db.Rating,
          required: false,
        },
      ],
    })
      .then((product) => {
        if (product instanceof db.Product !== true)
          return res.json({ success: false, message: "Product not found" });

        const productValue = product.toJSON();
        const rating =
          product.Ratings.reduce((acc, curr) => (acc += curr.rate), 0) /
          product.Ratings.length;

        res.json({
          success: true,
          data: {
            ...productValue,
            rating,
            availableRange: [
              productValue.availabilityStartDate,
              productValue.availabilityEndDate,
            ],
          },
        });
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
  body("availableRange").optional().isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    const [availabilityStartDate, availabilityEndDate] =
      req.body.availableRange || [];

    const values = {
      model: req.body.model,
      color: req.body.color,
      location: req.body.location,
      rating: req.body.rating,
      isAvailable: req.body.isAvailable,
    };

    if (availabilityStartDate) {
      values.availabilityStartDate = availabilityStartDate;
      values.availabilityEndDate = availabilityEndDate;
    }

    db.Product.create(values)
      .then((product) =>
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
  body("availableRange").optional().isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ succes: false, errors: errors.array() });

    db.Product.findOne({ where: { id: req.params.productId } })
      .then((product) => {
        if (product instanceof db.Product !== true)
          return res.json({ succes: false, message: "Product not found" });
      })
      .catch((err) => res.json({ succes: false, message: err.message }));

    const values = {
      model: req.body.model,
      color: req.body.color,
      location: req.body.location,
      rating: req.body.rating,
      isAvailable: req.body.isAvailable,
    };

    const [availabilityStartDate, availabilityEndDate] =
      req.body.availableRange;

    if (availabilityStartDate) {
      values.availabilityStartDate = availabilityStartDate;
      values.availabilityEndDate = availabilityEndDate;
    }

    db.Product.update(values, { where: { id: req.params.productId } })
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
