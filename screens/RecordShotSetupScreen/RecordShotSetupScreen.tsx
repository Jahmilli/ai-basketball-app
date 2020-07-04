import React, { FC, useState } from "react";
import styles from "./RecordShotSetupScreenStyles";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import ListOptionWithIcon from "../../components/ListOptionWithIcon/ListOptionWithIcon";
import { TypeOfShot, AngleOfShot } from "../../components/enums/ShotOption";
import { anglesList, typeOfShotsList } from "./RecordShotOptions";
const Icon = require("../../assets/images/right-chevron.png");

type RecordShotSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordShotSetup"
>;

type RecordShotSetupScreenProps = {
  navigation: RecordShotSetupScreenNavigationProp;
};

const RecordShotSetupScreen: FC<RecordShotSetupScreenProps> = ({
  navigation,
}) => {
  const [typeOfShot, setTypeOfShot] = useState<TypeOfShot>();
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
    // TODO: Uncomment this when ready to use data in recorder...
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
