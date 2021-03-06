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
  font-size: 24px;
  font-weight: bold;
  color: ${(props: any) => props.color ?? "black"};
`;

export const TextStyle = styled.Text`
  font-size: ${(props: any) => {
    switch (props.fontSize) {
      case "L":
        return "24px";
      case "M":
        return "20px";
      case "S":
        return "16px";
      default:
        return "16px";
    }
  }};
  font-weight: ${(props: any) => props.fontWeight ?? "normal"};
  color: ${(props: any) => props.color ?? "black"};
`;

export const InputLabelTextStyle = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.color ?? "black"};
  margin: 0;
`;

export const InputStyle = styled.TextInput`
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
