import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState, useContext } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { IScores, IScore } from "../../interfaces/IVideo";
import { RootStackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";
import { ListItemBody } from "../../screens/RecordShotOptionsScreen/RecordShotOptionsScreenStyles";
import { TextStyle } from "../../components/Styled/Styled";
import { getUser } from "../../logic/functions/user";
import {
  Container,
  ListItemContainer,
  ListItemTextLockup,
  NoUploadsLockup,
} from "./LeaderBoardScreenStyles";
import { AppContext} from "../../context";

type LeaderBoardkScreenRouteProp = RouteProp<RootStackParamList, "LeaderBoard">;

type LeaderBoardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
type LeaderBoardScreenProps = {
  route: LeaderBoardkScreenRouteProp;
  navigation: LeaderBoardScreenNavigationProp;
  score: IScores[];
};

const LeaderBoardScreen: FC<LeaderBoardScreenProps> = ({
  navigation,
  route,
}) => {
  const { scores } = route.params;
  console.log("Leaderboard scores are:  ", scores);
  const { theme } = useContext(AppContext);

  return (
    <View>
      {scores.map((score, index) => (
        <ListItemContainer key={score.id}>
          <ListItemBody key={index}>
            <ListItemTextLockup
              borderColor={theme.PRIMARY_BUTTON_BACKGROUND_COLOR}
            >
              <View style={{ width: "20%" }}>
                <TextStyle>{index + 1}</TextStyle>
              </View>
              <View style={{ width: "20%" }}>
                <TextStyle>{score.user_firstName}</TextStyle>
              </View>
              <View style={{ width: "20%" }}>
                <TextStyle>{score.score_prep || "Invalid"}</TextStyle>
              </View>
              <View style={{ width: "20%" }}>
                <TextStyle>{score.score_exec || "Invalid"}</TextStyle>
              </View>
              <View style={{ width: "20%" }}>
                <TextStyle>{score.score_follow || "Invalid"}</TextStyle>
              </View>
            </ListItemTextLockup>
          </ListItemBody>
        </ListItemContainer>
      ))}
    </View>
  );
};

export default LeaderBoardScreen;
