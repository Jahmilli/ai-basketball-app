import AppConfig from "../../../AppConfig";
import { get } from "./core/fetch";

const serverHostname = AppConfig.serverHostname;

export const getScores = async (): Promise<any> => {
  try {
    console.log(serverHostname + ":3003/v1/getScores");
    const scores = await get(
      `http://${serverHostname}` + ":3003/v1/getScores/"
    );
    return scores;
  } catch (err) {
    console.warn(`An error occurred when getting scores`, err);
    throw err;
  }
};
