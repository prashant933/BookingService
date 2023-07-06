const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "success" };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "Successfully published the message",
    });
  }

  async create(req, res) {
    try {
      req.body.userEmail = req.headers["user-email"];
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        data: response,
        success: true,
        message: "Successfully created booking",
        err: {},
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        data: [],
        success: false,
        message: "Some error occurred in booking controller",
        err: "Some error occurred in booking controller",
      });
    }
  }
}

module.exports = BookingController;
