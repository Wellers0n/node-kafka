import moment from "moment";
import kafkaConfig from "../config/kafka";
import locationModel from "../models/location";
import axios from "axios";

const locationConsumer = async () => {
  const { kafka } = kafkaConfig();

  const consumer = kafka.consumer({
    groupId: "location-group",
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "location" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const location = await JSON.parse(message.value);

      const currentLocation = await locationModel.findOne({
        clientId: location.clientId,
        ip: location.ip,
      });

      const timestamp = moment
        .unix(location.timestamp)
        .add(30, "minutes")
        .format("MM/DD/YYYY HH:mm:ss");

      const timestampNow = moment().format("MM/DD/YYYY HH:mm:ss");

      const is30MinLater = moment(timestamp).isBefore(timestampNow);

      console.log({ timestamp, timestampNow, is30MinLater, currentLocation });

      if (is30MinLater || !currentLocation) {
        const { data } = await axios.get(
          `${process.env.IPSTACK_URL}/${location.ip}`,
          {
            params: {
              access_key: process.env.IPSTACK_ACCESS_KEY,
            },
          }
        );

        const locationExist = await locationModel.findOne({
          ip: location.ip,
        });

        if (!!locationExist) {
          const update = {
            ip: location.ip,
            timestamp: location.timestamp,
            clientId: location.clientId,
            country: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude,
            region: data.region_name,
            city: data.city,
          };

          return await locationExist.updateOne(update);
        }

        return await locationModel.create({
          ip: location.ip,
          timestamp: location.timestamp,
          clientId: location.clientId,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          region: data.region_name,
          city: data.city,
        });
      }
    },
  });
};

export default locationConsumer;
