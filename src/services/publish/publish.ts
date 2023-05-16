import Users from "../../models/users";
import axios from "axios";
import publishLocation from "../../publishers/location";

type PublishProps = {
  ip: string;
  timestamp: number;
  clientId: string;
};

const publish = async ({ ip, timestamp, clientId }: PublishProps) => {
  try {
    // const { data } = await axios.get(`${process.env.IPSTACK_URL}/${ip}`, {
    //   params: {
    //     access_key: process.env.IPSTACK_ACCESS_KEY,
    //   },
    // });

    publishLocation({
      payload: {
        ip,
        timestamp,
        clientId,
        // country: data.country_name,
        // latitude: data.latitude,
        // longitude: data.longitude,
        // region: data.region_name,
        // city: data.city,
        // clientId: clientId,
      },
    });

    return {
      payload: {
        ip,
        timestamp,
        clientId,
      },
      message: "Successful publish",
      status: 200,
    };
  } catch (error) {
    return {
      payload: null,
      status: 400,
      message: "Failed publish",
    };
  }
};

export default publish;
