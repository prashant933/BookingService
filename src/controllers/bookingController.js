const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
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
};

module.exports = {
  create,
};
