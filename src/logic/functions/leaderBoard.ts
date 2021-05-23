import AppConfig from "../../../AppConfig";
import { get } from "./core/fetch";

const serverHostname = AppConfig.serverHostname;

export const getScores = async (): Promise<any> => {
  try {
    console.log(serverHostname + "/analytics/v1/getScores");
    const scores = await get(
      `http://${serverHostname}/analytics/v1/getScores/`
    );
    console.log(scores);
    return scores;
  } catch (err) {
    console.warn(`An error occurred when getting scores`, err);
    throw err;
  }
};
