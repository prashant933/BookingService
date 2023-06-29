const express = require("express");
const { BookingController } = require("../../controllers/index");

const router = express.Router();
const bookingController = new BookingController();

router.post("/book", bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
