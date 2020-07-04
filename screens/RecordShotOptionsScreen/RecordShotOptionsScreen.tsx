import React, { FC, useState } from "react";
import styles from "./RecordShotOptionsScreenStyles";
import { Button, View, Text, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { FlatList } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { IRecordShotOption } from "../../components/interfaces/IRecordShotOptions";

type SelectAngleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecordShotOptions"
>;

type SelectAngleScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecordShotOptions"
>;

type SelectAngleScreenProps = {
  navigation: SelectAngleScreenNavigationProp;
  route: SelectAngleScreenRouteProp;
};

const RecordShotOptionsScreen: FC<SelectAngleScreenProps> = ({
  navigation,
  route,
}) => {
  const { handleSelect, options } = route.params;
  const handleSelectAngle = (angle: IRecordShotOption) => {
    // Set state in previous, then go back
    handleSelect(angle.id);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: IRecordShotOption }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemBody}>
        <View style={styles.listItemTextLockup}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.listItemIconLockup}>
          <Image style={styles.listItemIcon} source={item.image} />
        </View>
      </View>
      <Button
        title="SELECT THIS OPTION"
        onPress={() => handleSelectAngle(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Select Angle</Text>
      <Text>
        Choose an angle from the angles listed below that represents how you
        will be recording the individual
      </Text>
      <FlatList
        data={options}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RecordShotOptionsScreen;
