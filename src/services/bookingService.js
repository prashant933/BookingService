const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const axios = require("axios");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const flightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(flightRequestUrl);
      const flightData = response.data.data;
      if (data.numberOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient seats"
        );
      }
      const totalCost = data.numberOfSeats * flightData.price;
      const bookingPayload = { ...data, totalCost };
      let booking = await this.bookingRepository.create(bookingPayload);
      await axios.patch(flightRequestUrl, {
        totalSeats: flightData.totalSeats - booking.numberOfSeats,
      });
      booking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return booking;
    } catch (error) {
      if (error.name == "ServiceError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  // implement update booking
}

module.exports = BookingService;
