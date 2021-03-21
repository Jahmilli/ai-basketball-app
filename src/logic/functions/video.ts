import AppConfig from "../../../AppConfig";
import { AngleOfShot } from "../../enums/AngleOfShot";
import { TypeOfShot } from "../../enums/TypeOfShot";
import { IVideo } from "../../interfaces/IVideo";
import { get, post } from "./core/fetch";

const server = AppConfig.apiUrl;
console.log("server is ", server);

export const getVideos = async (userId: string): Promise<any> => {
  try {
    const result = await get(`${server}/v1/video/${userId}/`);
    return result;
  } catch (err) {
    console.warn("An error occurred in getVideos video", err);
    throw err;
  }
};
export const createVideoEntry = async (
  userId: string,
  typeOfShot: TypeOfShot,
  angleOfShot: AngleOfShot
): Promise<IVideo> => {
  const data = {
    userId,
    angleOfShot,
    typeOfShot,
    name: "test name",
    description: "This is a temporary description",
  };

  try {
    const result = (await post(
      `${server}/v1/video`,
      JSON.stringify(data)
    )) as IVideo;
    return result;
  } catch (err) {
    console.warn("An error occurred in upload video", err);
    throw err;
  }
};

// Need to create a custom fetch function here as we're doing a multipart upload for video streaming...
export const streamVideo = async (id: string, uri: string) => {
  const options: any = {
    headers: {},
    method: "POST",
  };
  const extensionIndex = uri.indexOf(".");
  if (!extensionIndex) {
    throw new Error("Missing file extension");
  }
  const extension = uri.substr(extensionIndex);
  options.body = new FormData();

  options.body.append(`${id}${extension}`, {
    uri,
    name: `${id}${extension}`,
    type: `video/${extension}`, // TODO: Determine if using extension is okay here or just go back to video/mp4...
  });

  try {
    const result = await fetch(`${server}/v1/video/stream`, options);
    console.log("result in stream video is ", JSON.stringify(result));
  } catch (err) {
    console.warn("An error occurred when streaming video", err);
    throw err;
  }
};
