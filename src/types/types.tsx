import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";

export type RootStackParamList = {
  Login: undefined;
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
  RecordVideo: undefined;
};
