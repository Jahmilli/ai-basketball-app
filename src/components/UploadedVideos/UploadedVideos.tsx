import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { IVideo } from "../../interfaces/IVideo";
import { ListItemBody } from "../../screens/RecordShotOptionsScreen/RecordShotOptionsScreenStyles";
import { lightTheme } from "../../styles/theme.styles";
import { RootStackParamList } from "../../types/types";
import { PrimaryButton } from "../Button/Button";
import { TextStyle } from "../Styled/Styled";
import {
  Container,
  ListItemContainer,
  ListItemTextLockup,
  NoUploadsLockup,
} from "./styles";

const renderItem = (navigate: (video: IVideo) => void) => ({
  item,
}: {
  item: IVideo;
}) => (
  <ListItemContainer onPress={() => navigate(item)}>
    <ListItemBody>
      <ListItemTextLockup
        borderColor={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
      >
        <View style={{ width: "33%" }}>
          <TextStyle>
            {new Date(item.createdTimestamp).toLocaleDateString()}
          </TextStyle>
          <TextStyle>{item.angleOfShot}</TextStyle>
        </View>
        <View style={{ width: "33%" }}>
          <TextStyle style={{ textAlign: "center" }}>80%</TextStyle>
        </View>
        <View style={{ width: "33%" }}>
          <TextStyle fontWeight="bold" style={{ textAlign: "right" }}>
            {item.isProcessed ? "Complete" : "Processing"}
          </TextStyle>
        </View>
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
          <FlatList
            data={videos}
            style={{ width: "100%" }}
            renderItem={renderItem(handleNavigateToVideoFeedback)}
            initialNumToRender={50}
            keyExtractor={(item: IVideo) => item.id}
          />
          <PrimaryButton
            text="Record Shot"
            onPress={() => navigation.navigate("RecordShotSetup")}
          />
        </>
      ) : (
        <NoUploadsLockup>
          <Text>Looks like you haven't uploaded videos yet!</Text>
          <Button
            title="Get Started!"
            onPress={() => navigation.navigate("RecordShotSetup")}
          />
        </NoUploadsLockup>
      )}
    </Container>
  );
};
