import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";
import { IUploadedVideo } from "../interfaces/IUploadedVideo";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
  Home: undefined;
  RecordShotSetup:
    | {
        id: AngleOfShot | TypeOfShot;
      }
    | undefined;
  RecordShotOptions: {
    screen: keyof RootStackParamList;
    options: any;
  };
  RecordVideo: {
    typeOfShot: TypeOfShot;
    angleOfShot: AngleOfShot;
  };
  VideoFeedback: {
    video: IUploadedVideo;
  };
};
