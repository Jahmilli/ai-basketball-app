import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PrimaryButton } from "../../components/Button/Button";
import { IRecordShotOption } from "../../interfaces/IRecordShotOption";
import { lightTheme } from "../../styles/theme.styles";
import { RootStackParamList } from "../../types/types";
import styles, {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemTextLockup,
  ListItemTitle,
} from "./RecordShotOptionsScreenStyles";

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
  const { screen, options } = route.params;
  const [selectedOptionId, setSelectedOptionId] = useState(options[0].id);

  const handleSelectRecordShotOption = () => {
    navigation.navigate(screen, {
      id: selectedOptionId,
    });
  };

  const renderItem = ({ item }: { item: IRecordShotOption }) => (
    <ListItem
      borderColor={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
      isSelected={item.id === selectedOptionId}
      onPress={() => setSelectedOptionId(item.id)}
    >
      <ListItemBody>
        <ListItemTextLockup>
          <ListItemTitle>{item.title}</ListItemTitle>
          <ListItemDescription>{item.description}</ListItemDescription>
        </ListItemTextLockup>
        <View style={styles.listItemIconLockup}>
          <Image style={styles.listItemIcon} source={item.image} />
        </View>
      </ListItemBody>
    </ListItem>
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
      <View style={{ width: "100%", marginBottom: 15 }}>
        <PrimaryButton text="Select" onPress={handleSelectRecordShotOption} />
      </View>
    </View>
  );
};

export default RecordShotOptionsScreen;
