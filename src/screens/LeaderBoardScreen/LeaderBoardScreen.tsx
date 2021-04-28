import React, { FC } from "react";
import { Text, View } from "react-native";
import styles from "./LeaderBoardScreenStyles";

type LeaderBoardScreenProps = {};
const LeaderBoardScreen: FC<LeaderBoardScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LEADERBOARD</Text>
      <Text style={styles.description}>See your scores</Text>
      <View style={styles.bodyLockup}>
        <View style={styles.textLockup}>
          <Text style={styles.textTitle}>Processed status: </Text>
          <Text style={styles.textValue}></Text>
        </View>
      </View>
    </View>
  );
};

export default LeaderBoardScreen;
