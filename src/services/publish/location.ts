import publishLocation from "../../publishers/location";

type PublishProps = {
  ip: string;
  timestamp: number;
  clientId: string;
};

const publish = async ({ ip, timestamp, clientId }: PublishProps) => {
  try {
    publishLocation({
      payload: {
        ip,
        timestamp,
        clientId,
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
