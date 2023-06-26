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
      return flightData;
      // const flightData = response.data.data;
      // if (data.numberOfSeats > flightData.totalSeats) {
      //   throw new ServiceError();
      // }
    } catch (error) {
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
