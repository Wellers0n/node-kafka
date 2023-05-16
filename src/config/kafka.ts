const { Kafka } = require("kafkajs");

const kafkaConfig = () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });

  return {
    kafka,
  };
};

export default kafkaConfig;
