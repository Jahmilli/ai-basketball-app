import styled from "styled-components/native";

export const ContainerStyle = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: any) => props.backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const TextContainerStyle = styled.View`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${(props: any) => props.color};
`;

export const TitleStyle = styled.Text`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  color: ${(props: any) => props.color ?? "black"};
`;

export const TextStyle = styled.Text`
  font-size: 14px;
  font-weight: ${(props: any) => props.fontWeight ?? "normal"};
  color: ${(props: any) => props.color ?? "black"};
`;

export const InputStyle = styled.TextInput`
  margin: 10px 0;
  padding: 5px 10px;
  width: 100%;
  height: 50px;
  border-color: ${(props: any) => props.borderColor};
  background-color: ${(props: any) => props.backgroundColor};
  border-width: 1px;
  border-radius: 10px;
`;
// color: ${(props: any) => props.color};

export const PrimaryButtonStyle = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  background-color: ${(props: any) => props.backgroundColor};
  color: ${(props: any) => props.color};
  border-radius: 50px;
  padding: 15px 0;
`;
export const PrimaryButtonTextStyle = styled.Text`
  color: ${(props: any) => props.color};
  font-weight: bold;
  text-align: center;
`;
