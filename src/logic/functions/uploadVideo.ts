import { post } from "./core/fetch";
import { TypeOfShot } from "../../enums/TypeOfShot";
import { AngleOfShot } from "../../enums/AngleOfShot";
import AppConfig from "../../../AppConfig";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";

const server = "http://192.168.0.139:3001";
export const createVideoEntry = async (): Promise<IUploadedVideo> => {
  const data = {
    userId: "test",
    name: "test name",
    description: "This is a temporary description",
    angleOfShot: AngleOfShot.SIDE_ON,
    typeOfShot: TypeOfShot.FREE_THROW,
    uploadedTimestamp: new Date(),
  };

  try {
    const result = (await post(
      `${server}/v1/video/create`,
      JSON.stringify(data)
    )) as IUploadedVideo;
    return result;
  } catch (err) {
    console.warn("An error occurred in upload video", err);
    throw err;
  }
};

// Need to create a custom fetch function here as we're doing a multipart upload for video streaming...
export const streamVideo = async (id: string, uri: string) => {
  let options: any = {
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
