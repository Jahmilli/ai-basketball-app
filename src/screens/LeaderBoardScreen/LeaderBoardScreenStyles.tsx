import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const UploadedVideosLockup = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const NoUploadsLockup = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ListItemContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

export const VideosList = styled.FlatList`
  width: 100%;
`;

export const VideoListItem = styled.View`
  width: 100%;
  margin-top: 10px;
  border-color: black;
  border-width: 1;
  border-radius: 5;
`;

export const VideolistItemBody = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
`;

export const ListItemTextLockup = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: ${(props: any) => props.borderColor ?? "black"};
  border-bottom-width: 2px;
`;

export const ListItemTitle = styled.Text`
  font-weight: bold;
`;

export const LeaderBoard = styled.FlatList`
  flex: 1;
  align-items: center;
  padding: 20px;
  width: 100%;
`;
