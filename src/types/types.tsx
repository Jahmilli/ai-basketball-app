import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";
import { IVideo, IScore } from "../interfaces/IVideo";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
  RecordShotSetup:
    | {
        id: AngleOfShot | TypeOfShot;
      }
    | undefined;
  RecordShotOptions: {
    screen: keyof RootStackParamList;
    options: any[];
  };
  RecordVideo: {
    typeOfShot: TypeOfShot;
    angleOfShot: AngleOfShot;
  };
  VideoPlayer: {
    uri: string;
  };
  VideoFeedback: {
    video: IVideo;
  };
  LeaderBoard: {
    scores: IScore[];
  };
};
