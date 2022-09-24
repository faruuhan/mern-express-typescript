import mongooseConfig, { ConnectOptions } from "mongoose";

const { URL_MONGODB } = process.env;

exports.connect = () => {
  mongooseConfig
    .connect(
      URL_MONGODB as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error: Error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
