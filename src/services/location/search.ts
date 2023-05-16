import Users from "../../models/users";
import axios from "axios";
import publishLocation from "../../publishers/location";

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

    publishLocation({
      payload: {
        ip: data.ip,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp,
        region: data.region_name,
        city: data.city,
        clientId: clientId,
      },
    })

    return {
      payload: {
        ip: data.ip,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country_name,
        region: data.region_name,
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
