import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { Button, FlatList, Text } from "react-native";
import { IVideo } from "../../interfaces/IVideo";
import {
  ListItemBody,
  ListItemTitle,
} from "../../screens/RecordShotOptionsScreen/RecordShotOptionsScreenStyles";
import { RootStackParamList } from "../../types/types";
import {
  Container,
  ListItemContainer,
  ListItemTextLockup,
  ListItemTitleLockup,
  NoUploadsLockup,
  UploadedVideosLockup,
} from "./styles";

const renderItem = (navigate: (video: IVideo) => void) => ({
  item,
}: {
  item: IVideo;
}) => (
  <ListItemContainer onPress={() => navigate(item)}>
    <ListItemBody>
      <ListItemTextLockup>
        <ListItemTitleLockup>
          <ListItemTitle>{item.name}</ListItemTitle>
        </ListItemTitleLockup>
        <Text>{item.description}</Text>
        <Text>
          Uploaded date: {new Date(item.createdTimestamp).toLocaleDateString()}
        </Text>
        <Text>
          Uploaded time: {new Date(item.createdTimestamp).toLocaleTimeString()}
        </Text>
        <Text>
          Processed status: {item.isProcessed ? "Complete" : "Pending"}
        </Text>
        {/* {!item.isProcessed ? (
          <View style={styles.viewFeedbackLockup}>
            <Button
              title="View Feedback"
              onPress={() => handleNavigateToVideoFeedback(item)}
            />
          </View>
        ) : null} */}
      </ListItemTextLockup>
    </ListItemBody>
  </ListItemContainer>
);

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type UploadedVideosProps = {
  navigation: HomeScreenNavigationProp;
  videos: IVideo[];
};

export const UploadedVideos: FC<UploadedVideosProps> = ({
  navigation,
  videos,
}) => {
  const handleNavigateToVideoFeedback = (video: IVideo) => {
    navigation.navigate("VideoFeedback", {
      video,
    });
  };

  return (
    <Container>
      {videos.length > 0 ? (
        <>
          <UploadedVideosLockup>
            <Text>Upload another video?</Text>
            <Button
              title="Record Shot"
              onPress={() => navigation.navigate("RecordShotSetup")}
            />
          </UploadedVideosLockup>
          <FlatList
            data={videos}
            style={{ width: "100%" }}
            renderItem={renderItem(handleNavigateToVideoFeedback)}
            keyExtractor={(item: IVideo) => item.id}
          />
        </>
      ) : (
        <NoUploadsLockup>
          <Text>Looks like you haven't uploaded videos yet!</Text>
          <Button
            title="Get Started!"
            onPress={() => navigation.navigate("RecordShotSetup")}
          />
          {/* <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleNavigate}
        >
          <Text>Get</Text>
          </TouchableOpacity> */}
        </NoUploadsLockup>
      )}
    </Container>
  );
};
