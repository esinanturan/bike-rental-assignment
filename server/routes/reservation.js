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

router.get(
  "/me",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    db.Reservation.findAll({
      where: { userId: req.user?.id },
      include: [
        {
          model: db.Product,
          required: true,
        },
      ],
    })
      .then((reservations) =>
        res.json({
          success: true,
          data: reservations.map((reservation) => ({
            ...reservation?.Product?.toJSON(),
            ...reservation?.toJSON(),
            Product: undefined,
          })),
        })
      )
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

router.post(
  "/create",
  passport.authenticate("bearer", { session: false }),
  body("productId").isNumeric().trim().escape(),
  body("pickedRange").isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    const [startTime, endTime] = req.body.pickedRange;

    db.Reservation.create({
      productId: req.body.productId,
      userId: req.user?.id,
      startTime,
      endTime,
    })
      .then((reservation) =>
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
          message: "The reservation has been cancelled.",
        });
      })
      .catch((err) => res.json({ success: false, message: err.message }));
  }
);

module.exports = router;
