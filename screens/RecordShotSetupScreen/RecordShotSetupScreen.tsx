import React, { FC, useState } from "react";
import styles from "./RecordShotSetupScreenStyles";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import ListOptionWithIcon from "../../components/ListOptionWithIcon/ListOptionWithIcon";
import { TypeOfShot, AngleOfShot } from "../../components/enums/TypeOfShot";
import { IRecordShotOption } from "../../components/interfaces/IRecordShotOptions";
const Icon = require("../../img/right-chevron.png");

type RecordShotSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordShotSetup"
>;

type RecordShotSetupScreenProps = {
  navigation: RecordShotSetupScreenNavigationProp;
};

// TODO: This should either live in database or live in constants directory
const anglesList: IRecordShotOption[] = [
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
    description: "The player ",
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
const typeOfShotsList: IRecordShotOption[] = [
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

const RecordShotSetupScreen: FC<RecordShotSetupScreenProps> = ({
  navigation,
}) => {
  const [typeOfShot, setTypeOfShot] = useState<TypeOfShot>(); // TODO: Maybe use enum for types of shots
  const [angleOfShot, setAngleOfShot] = useState<AngleOfShot>();

  const handleSelectAngleOfShot = () => {
    navigation.navigate("RecordShotOptions", {
      handleSelect: setAngleOfShot,
      options: anglesList,
    });
  };

  const handleSelectTypeOfShot = () => {
    navigation.navigate("RecordShotOptions", {
      handleSelect: setTypeOfShot,
      options: typeOfShotsList,
    });
  };

  const handleSelectContinue = () => {
    // if (!typeOfShot || !angleOfShot) {
    //   alert("Please complete all options before continuing...");
    //   return;
    // }
    navigation.navigate("RecordVideo");
  };

  return (
    <View style={styles.container}>
      <Text>Record a shot!</Text>
      <Text>Before we start recording, lets get setup.</Text>
      <Text>Configure the below options</Text>
      <ListOptionWithIcon
        title="Select type of shot"
        selected={typeOfShot || ""}
        onPress={handleSelectTypeOfShot}
        icon={Icon}
      />
      <ListOptionWithIcon
        title="Select angle"
        selected={angleOfShot || ""}
        onPress={handleSelectAngleOfShot}
        icon={Icon}
      />
      <Button title="CONTINUE" onPress={handleSelectContinue} />
    </View>
  );
};

export default RecordShotSetupScreen;
