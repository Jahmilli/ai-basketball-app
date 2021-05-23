import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { TextStyle } from "../../components/Styled/Styled";
import { AppContext } from "../../context";
import { IScore, IScores } from "../../interfaces/IVideo";
import { ListItemBody } from "../../screens/RecordShotOptionsScreen/RecordShotOptionsScreenStyles";
import { RootStackParamList } from "../../types/types";
import {
  ListItemContainer,
  ListItemTextLockup,
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

const renderItem =
  (theme: any) =>
  ({ item, index }: { item: IScore; index: number }) => {
    return (
      <ListItemContainer key={item.id}>
        <ListItemBody>
          <ListItemTextLockup
            borderColor={theme.PRIMARY_BUTTON_BACKGROUND_COLOR}
          >
            <View style={{ width: "10%" }}>
              <TextStyle>{index + 1}</TextStyle>
            </View>
            <View style={{ width: "35%" }}>
              <TextStyle>{item.first_name}</TextStyle>
            </View>
            <View style={{ width: "20%" }}>
              <TextStyle>
                {item.score_exec !== "NaN" ? item.score_exec : "Invalid"}
              </TextStyle>
            </View>
            <View style={{ width: "20%" }}>
              <TextStyle>
                {item.score_follow !== "NaN" ? item.score_follow : "Invalid"}
              </TextStyle>
            </View>
            <View style={{ width: "20%" }}>
              <TextStyle>
                {item.score_prep !== "NaN" ? item.score_prep : "Invalid"}
              </TextStyle>
            </View>
          </ListItemTextLockup>
        </ListItemBody>
      </ListItemContainer>
    );
  };

const LeaderBoardScreen: FC<LeaderBoardScreenProps> = ({
  navigation,
  route,
}) => {
  // const { scores } = route.params;
  const [scores, setScores] = useState<IScore[]>([]);
  useEffect(() => {
    const currentScores = route.params.scores ? [...route.params.scores] : [];
    if (!currentScores) {
      // setScores(getDefaultData());
      setScores([]);
      return;
    }
    const sortedScores = currentScores.sort((a: IScore, b: IScore) => {
      const aScoreExec = parseInt(a.score_exec) || -1;
      const bScoreExec = parseInt(b.score_exec) || -1;
      return bScoreExec - aScoreExec;
    });
    setScores(sortedScores);
    // setScores(generateDisplayedList);
  }, [route.params.scores]);

  const { theme } = useContext(AppContext);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TextStyle fontWeight="bold">Rank</TextStyle>
        <TextStyle fontWeight="bold">Name</TextStyle>
        <TextStyle fontWeight="bold">Exec</TextStyle>
        <TextStyle fontWeight="bold">Follow</TextStyle>
        <TextStyle fontWeight="bold">Prep</TextStyle>
      </View>
      <FlatList
        data={scores}
        style={{ width: "100%" }}
        renderItem={renderItem(theme)}
        initialNumToRender={50}
        keyExtractor={(item: IScore) => item.id}
      />
    </>
  );
};

export default LeaderBoardScreen;
