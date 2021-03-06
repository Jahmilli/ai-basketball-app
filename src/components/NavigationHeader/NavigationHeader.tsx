import React, { FC, useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { AppContext } from "../../context";
import { TitleStyle } from "../Styled/Styled";

interface INavigationButton {
  title: string;
  onPress: () => void;
}

type NavigationHeaderProps = {
  title: string;
  leftButton?: INavigationButton;
  rightButton?: INavigationButton;
};

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

const NavigationButton = styled.TouchableOpacity``;

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  title,
  leftButton,
  rightButton,
}) => {
  const { theme } = useContext(AppContext);
  return (
    <Container>
      {/* <View>
        {leftButton && (
          <NavigationButton onPress={leftButton.onPress}>
            <Text>{leftButton.title}</Text>
          </NavigationButton>
        )}
      </View> */}
      <TitleStyle>{title}</TitleStyle>
      <View>
        {rightButton && (
          <NavigationButton onPress={rightButton.onPress}>
            <Text style={{ color: theme.PRIMARY_BUTTON_BACKGROUND_COLOR }}>
              {rightButton.title}
            </Text>
          </NavigationButton>
        )}
      </View>
    </Container>
  );
};
