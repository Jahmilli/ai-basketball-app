import { IRecordShotOption } from "../interfaces/IRecordShotOption";
import { AngleOfShot } from "../enums/AngleOfShot";
import { TypeOfShot } from "../enums/TypeOfShot";
const Icon = require("../../assets/images/right-chevron.png");

export const anglesList: IRecordShotOption[] = [
  {
    id: AngleOfShot.SIDE_ON,
    title: "Side on",
    description:
      "The player will be recorded from their left or right side at shoulder",
    image: Icon, // TODO: Update with proper image
  },
  {
    id: AngleOfShot.FRONT_FACING,
    title: "Front facing",
    description: "The player will be facing towards the camera",
    image: Icon, // TODO: Update with proper image
  },
  {
    id: AngleOfShot.FROM_THE_BACK,
    title: "From the back",
    description:
      "The player will be facing away from the camera and the camera",
    image: Icon, // TODO: Update with proper image
  },
];

// TODO: This should either live in database or live in constants directory
export const typeOfShotsList: IRecordShotOption[] = [
  {
    id: TypeOfShot.FREE_THROW,
    title: "Free throw",
    description: "The player will be shooting from the free throw line",
    image: Icon, // TODO: Update with proper image
  },
  {
    id: TypeOfShot.THREE_POINTER,
    title: "Three Pointer",
    description: "The player will be shooting from the three point line",
    image: Icon, // TODO: Update with proper image
  },
];
