import styled from "styled-components/native";

export const TabLockup = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const TabTitle = styled.Text`
  font-size: 24px;
  text-decoration: ${(props: any) => (props.isSelected ? "underline" : "none")};
`;
