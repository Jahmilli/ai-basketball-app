import AppConfig from "../../../AppConfig";
import { get } from "./core/fetch";

const serverHostname = AppConfig.serverHostname;

export const getLastScore = async (userId: any): Promise<any> => {
  try {
    console.log(serverHostname + ":3003/v1/getLastScore");
    const lastScore = await get(
      `http://${serverHostname}` + ":3003/v1/getLastScore/" + userId
    );
    return lastScore;
  } catch (err) {
    console.warn(`An error occurred when getting most recent score`, err);
    throw err;
  }
};