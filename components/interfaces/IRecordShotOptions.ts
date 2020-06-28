import { AngleOfShot, TypeOfShot } from "../enums/TypeOfShot";

export interface IRecordShotOption {
  id: AngleOfShot | TypeOfShot; // TODO: This probably isn't the correct way of doing this so figure it out
  title: string;
  description: string;
  image: any;
}
