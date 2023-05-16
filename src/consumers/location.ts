import kafkaConfig from "../config/kafka";
import locationModel from "../models/location";

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

      console.log("location consumer: \n");
      console.log(location);
    },
  });

};

export default locationConsumer;
