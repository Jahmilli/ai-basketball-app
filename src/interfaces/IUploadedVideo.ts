import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";

// Having different casing conventions is so much fun! :D
export interface IUploadedVideo {
  id: string;
  user_id: string;
  name: string;
  description: string;
  is_processed: boolean;
  angle_of_shot: AngleOfShot;
  type_of_shot: TypeOfShot;
  storage_uri: string;
  feedback: IFeedback | null;
  uploaded_timestamp: string;
}

export interface IFeedback {
  multiAxis: string;
  singleAxis: string;
  angle: string;
}
