import React, { FC, useEffect, useState } from "react";
import styles from "./HomeScreenStyles";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { getVideos } from "../../logic/functions/uploadVideo";
import { IUploadedVideo } from "../../interfaces/IUploadedVideo";
import { FlatList } from "react-native-gesture-handler";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const handleNavigate = () => {
    navigation.navigate("RecordShotSetup");
  };

  useEffect(() => {
    const callGetVideos = async () => {
      try {
        const videos = await getVideos("test");
        setVideos(videos);
      } catch (err) {
        console.log("An error occurred when getting videos", err);
      }
    };
    callGetVideos();
  }, []);

  const renderItem = ({ item }: { item: IUploadedVideo }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemBody}>
        <View style={styles.listItemTextLockup}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>
            Processed status: {item.is_processed ? "Complete" : "Pending"}
          </Text>
          <Text>
            Uploaded date:{" "}
            {new Date(item.uploaded_timestamp).toLocaleDateString()}
          </Text>
          <Text>
            Uploaded time:{" "}
            {new Date(item.uploaded_timestamp).toLocaleTimeString()}
          </Text>
          <Text>Type of Shot: {item.type_of_shot}</Text>
          <Text>Angle of Shot: {item.angle_of_shot}</Text>
        </View>
        {/* <View style={styles.listItemIconLockup}>
          <Image style={styles.listItemIcon} source={item.image} />
        </View> */}
      </View>
      {/* <Button
        title="SELECT THIS OPTION"
        onPress={() => handleSelectRecordShotOption(item)}
      /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Record Shot" onPress={handleNavigate} />
      {videos.length > 0 ? (
        <>
          <Text>Videos are</Text>
          <FlatList
            data={videos}
            style={styles.list}
            renderItem={renderItem}
            keyExtractor={(item: IUploadedVideo) => item.id}
          />
        </>
      ) : (
        <Text>You do not currently have any uploaded videos</Text>
      )}
    </View>
  );
};

export default HomeScreen;
