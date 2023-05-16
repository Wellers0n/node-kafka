import { Request, Response } from "express";
import LocationServices from "../../services/location";
import moment from "moment";

const Search = async (request: Request, response: Response) => {
  const { ip, timestamp, clientId } = request.body;

  console.log({ ip, timestamp, clientId });

  if (!ip || !timestamp || !clientId) {
    return response
      .status(400)
      .json({ message: "IP, timestamp and clientId is required" });
  }

  const { message, payload, status } = await LocationServices.Search({
    ip,
    timestamp,
    clientId,
  });

  const timestampResponse = moment().unix();

  return response
    .status(status)
    .json({ message, payload, clientId, timestamp: timestampResponse });
};

export default Search;
