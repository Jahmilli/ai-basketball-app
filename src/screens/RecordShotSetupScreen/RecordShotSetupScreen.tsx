import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "../../components/Button/Button";
import ListOptionWithIcon from "../../components/ListOptionWithIcon/ListOptionWithIcon";
import { anglesList } from "../../constants/RecordShotOptions";
import { AngleOfShot } from "../../enums/AngleOfShot";
import { TypeOfShot } from "../../enums/TypeOfShot";
import { RootStackParamList } from "../../types/types";
import styles from "./RecordShotSetupScreenStyles";
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
    }
    // else if (Object.values(TypeOfShot).includes(id as TypeOfShot)) {
    //   setTypeOfShot(id as TypeOfShot);
    // }
    else {
      console.warn(`UNKNOWN TYPE FOR ID: ${id}`);
    }
  }, [route.params?.id]);

  // const [typeOfShot, setTypeOfShot] = useState<TypeOfShot>();
  const [angleOfShot, setAngleOfShot] = useState<AngleOfShot>();

  const handleSelectAngleOfShot = () => {
    navigation.navigate("RecordShotOptions", {
      screen: "RecordShotSetup",
      options: anglesList,
    });
  };

  // const handleSelectTypeOfShot = () => {
  //   navigation.navigate("RecordShotOptions", {
  //     screen: "RecordShotSetup",
  //     options: typeOfShotsList,
  //   });
  // };

  const handleSelectContinue = () => {
    // TODO: Uncomment this when ready to use data in recorder...
    if (!angleOfShot) {
      alert("Please complete all options before continuing...");
      return;
    }
    navigation.navigate("RecordVideo", {
      // typeOfShot: typeOfShot ?? TypeOfShot.FREE_THROW,
      typeOfShot: TypeOfShot.FREE_THROW, // Whilst we currently do not require TypeOfShot, we'll just default to this...
      angleOfShot: angleOfShot ?? AngleOfShot.FROM_THE_BACK,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexGrow: 1, width: "100%" }}>
        <Text style={styles.title}>Record a shot!</Text>
        <Text style={styles.subheader1}>
          Before we start recording, lets get setup.
        </Text>
        <ListOptionWithIcon
          title="Select angle"
          selected={angleOfShot || ""}
          onPress={handleSelectAngleOfShot}
          icon={Icon}
        />
      </View>
      <View style={{ width: "100%", marginBottom: 15 }}>
        <PrimaryButton text="Record Video" onPress={handleSelectContinue} />
      </View>
    </View>
  );
};

export default RecordShotSetupScreen;
