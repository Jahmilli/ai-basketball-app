import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext } from "react";
import { FlatList, View } from "react-native";
import { AppContext } from "../../context";
import { IVideo } from "../../interfaces/IVideo";
import { ListItemBody } from "../../screens/RecordShotOptionsScreen/RecordShotOptionsScreenStyles";
import { RootStackParamList } from "../../types/types";
import { PrimaryButton } from "../Button/Button";
import { TextStyle } from "../Styled/Styled";
import {
  Container,
  ListItemContainer,
  ListItemTextLockup,
  NoUploadsLockup,
} from "./styles";

const renderItem = (theme: any, navigate: (video: IVideo) => void) => ({
  item,
}: {
  item: IVideo;
}) => {
  return (
    <ListItemContainer onPress={() => navigate(item)}>
      <ListItemBody>
        <ListItemTextLockup borderColor={theme.PRIMARY_BUTTON_BACKGROUND_COLOR}>
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
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type UploadedVideosProps = {
  navigation: HomeScreenNavigationProp;
  videos: IVideo[];
};

export const UploadedVideos: FC<UploadedVideosProps> = ({
  navigation,
  videos,
}) => {
  const { theme } = useContext(AppContext);
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
            renderItem={renderItem(theme, handleNavigateToVideoFeedback)}
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
          <TextStyle>Looks like you haven't uploaded videos yet!</TextStyle>
          <PrimaryButton
            text="Get Started!"
            onPress={() => navigation.navigate("RecordShotSetup")}
          />
        </NoUploadsLockup>
      )}
    </Container>
  );
};
