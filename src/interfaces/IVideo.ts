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

export interface IResult {
  feedback: IFeedback;
  scores: IScore;
}

export interface IFeedback {
  multiAxis: string;
  singleAxis: string;
  angle: string;
}

export interface IScore {
  id: string;
  user_id: string;
  score_prep: string;
  score_exec: string;
  score_follow: string;
  created_timestamp: string;
  user_firstName: string;
  user_lastName: string;
}

export interface IScores {
  score: IScore[];
}
