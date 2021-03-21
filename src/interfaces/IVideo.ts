import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";

// Having different casing conventions is so much fun! :D
export interface IVideo {
  id: string;
  userId: string;
  name: string;
  description: string;
  isProcessed: boolean;
  angleOfShot: AngleOfShot;
  typeOfShot: TypeOfShot;
  storageUri: string;
  feedback: IFeedback | null;
  createdTimestamp: number;
}

export interface IFeedback {
  multiAxis: string;
  singleAxis: string;
  angle: string;
}
