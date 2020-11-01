import React, { FC, useState, useEffect } from "react";
import styles from "./RecordShotSetupScreenStyles";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import ListOptionWithIcon from "../../components/ListOptionWithIcon/ListOptionWithIcon";
import { AngleOfShot } from "../../enums/AngleOfShot";
import { TypeOfShot } from "../../enums/TypeOfShot";
import { anglesList, typeOfShotsList } from "../../constants/RecordShotOptions";
import { RouteProp } from "@react-navigation/native";
const Icon = require("../../../assets/images/right-chevron.png");

type RecordShotSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordShotSetup"
>;

type RecordShotSetupScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecordShotSetup"
>;

type RecordShotSetupScreenProps = {
  navigation: RecordShotSetupScreenNavigationProp;
  route: RecordShotSetupScreenRouteProp;
};

const RecordShotSetupScreen: FC<RecordShotSetupScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    const id = route.params?.id;
    if (!id) {
      return;
    }
    if (Object.values(AngleOfShot).includes(id as AngleOfShot)) {
      setAngleOfShot(id as AngleOfShot);
    } else if (Object.values(TypeOfShot).includes(id as TypeOfShot)) {
      setTypeOfShot(id as TypeOfShot);
    } else {
      console.warn(`UNKNOWN TYPE FOR ID: ${id}`);
    }
  }, [route.params?.id]);

  const [typeOfShot, setTypeOfShot] = useState<TypeOfShot>();
  const [angleOfShot, setAngleOfShot] = useState<AngleOfShot>();

  const handleSelectAngleOfShot = () => {
    navigation.navigate("RecordShotOptions", {
      screen: "RecordShotSetup",
      options: anglesList,
    });
  };

  const handleSelectTypeOfShot = () => {
    navigation.navigate("RecordShotOptions", {
      screen: "RecordShotSetup",
      options: typeOfShotsList,
    });
  };

  const handleSelectContinue = () => {
    // TODO: Uncomment this when ready to use data in recorder...
    // if (!typeOfShot || !angleOfShot) {
    //   alert("Please complete all options before continuing...");
    //   return;
    // }
    navigation.navigate("RecordVideo", {
      typeOfShot: typeOfShot ?? TypeOfShot.FREE_THROW,
      angleOfShot: angleOfShot ?? AngleOfShot.FROM_THE_BACK,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record a shot!</Text>
      <Text style={styles.subheader1}>
        Before we start recording, lets get setup.
      </Text>
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
