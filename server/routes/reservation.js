const express = require("express");
const { body, validationResult } = require("express-validator");
const passport = require("../middlewares/passport");
const db = require("../models");
const router = express.Router();

router.get("/all", (req, res) => {
  db.Reservation.findAll()
    .then((reservations) => res.json({ succes: true, data: reservations }))
    .catch((err) => res.json({ succes: false, message: err.message }));
});

router.post(
  "/create",
  passport.authenticate("bearer", { session: false }),
  body("productId").isNumeric().not().isEmpty().trim().escape(),
  body("startTime").isDate().not().isEmpty(),
  body("endTime").isDate().not().isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ succes: false, errors: errors.array() });

    db.Reservation.create({
      productId: req.body.productId,
      userId: req.user.id,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    })
      .then((user) =>
        res.json({
          success: true,
          message: "The reservation has been created successfully.",
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.delete(
  "/delete/:reservationId",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Reservation.findOne({
      where: { id: req.params.reservationId },
    })
      .then((reservation) => {
        if (reservation instanceof db.Reservation !== true)
          return res.json({ succes: false, message: "Reservation not found" });

        reservation.destroy();
        res.json({
          success: true,
          message: "The reservation has been deleted.",
        });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;
