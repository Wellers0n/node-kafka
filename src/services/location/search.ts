import Users from "../../models/users";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type SearchProps = {
  ip: string;
  timestamp: number;
  clientId: string;
};

const search = async ({ ip, timestamp, clientId }: SearchProps) => {
  try {
    const { data } = await axios.get(`${process.env.IPSTACK_URL}/${ip}`, {
      params: {
        access_key: process.env.IPSTACK_ACCESS_KEY,
      },
    });

    return {
      payload: {
        ip: data.ip,
        latitude: data.latitude,
        longitude: data.longitude,
        country_name: data.country_name,
        country_code: data.country_code,
        region_name: data.region_name,
        region_code: data.region_code,
        city: data.city,
      },
      message: "Successful search",
      status: 200,
    };
  } catch (error) {
    return {
      payload: null,
      status: 400,
      message: "Failed search",
    };
  }
};

export default search;
