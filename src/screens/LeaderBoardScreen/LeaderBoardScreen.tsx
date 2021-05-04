import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState, useContext } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { IScores, IScore } from "../../interfaces/IVideo";
import { lightTheme } from "../../styles/theme.styles";
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

  return (
    <View>
      <TextStyle fontSize="L">Suck MY cock...</TextStyle>

      <View>
        {scores.map((score, index) => (
          <ListItemContainer>
            <ListItemBody key={index}>
              <ListItemTextLockup
                borderColor={lightTheme.PRIMARY_BUTTON_BACKGROUND_COLOR}
              >
                <View style={{ width: "25%" }}>
                  <TextStyle>{index + 1}</TextStyle>
                </View>
                <View style={{ width: "25%" }}>
                  <TextStyle>{score.score_prep}</TextStyle>
                </View>
                <View style={{ width: "25%" }}>
                  <TextStyle>{score.score_exec}</TextStyle>
                </View>
                <View style={{ width: "25%" }}>
                  <TextStyle>{score.score_follow}</TextStyle>
                </View>
              </ListItemTextLockup>
            </ListItemBody>
          </ListItemContainer>
        ))}
      </View>
    </View>
  );
};

export default LeaderBoardScreen;
