import DateTimePicker, {
  Event as DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PrimaryButton } from "../../components/Button/Button";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { TextStyle, TitleStyle } from "../../components/Styled/Styled";
import { createUser } from "../../logic/functions/user";
import { OnboardingInitialScreenContainer } from "./styles";

type OnboardingUserCreationProps = {
  userId: string;
  email: string;
  handleUserCreated: () => void;
  handleBack: () => void;
};

export const OnboardingUserCreation: FC<OnboardingUserCreationProps> = ({
  userId,
  email,
  handleUserCreated,
  handleBack,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    // profilePicture: null, TODO: Future improvement...
  });
  const [shouldDisplayDatePicker, setShouldDisplayDatePicker] = useState(false);

  const handleChangeText = (key: string) => (text: string) => {
    setUserDetails((currentDetails) => ({
      ...currentDetails,
      [key]: text,
    }));
  };

  const handleSetDateOfBirth = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    // if (!date) return;
    const currentDate = selectedDate ?? userDetails.dateOfBirth;

    setUserDetails((currentDetails) => ({
      ...currentDetails,
      dateOfBirth: currentDate,
    }));
    setShouldDisplayDatePicker(false);
  };

  // TODO: Do input validation in text inputs...
  const renderFirstNameForm = () => {
    return (
      <CustomTextInput
        value={userDetails.firstName}
        label="What's your first name?"
        onChangeText={handleChangeText("firstName")}
        placeholder="First Name"
      />
    );
  };

  const renderLastNameForm = () => {
    return (
      <CustomTextInput
        value={userDetails.lastName}
        label="What's your last name?"
        onChangeText={handleChangeText("lastName")}
        placeholder="Last Name"
      />
    );
  };

  const renderDateForm = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setShouldDisplayDatePicker(true)}>
          <TextStyle>{userDetails.dateOfBirth.toDateString()}</TextStyle>
        </TouchableOpacity>
        {shouldDisplayDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={userDetails.dateOfBirth}
            mode="date"
            maximumDate={new Date()}
            display="default"
            onChange={handleSetDateOfBirth}
          />
        )}
      </View>
    );
  };

  const renderContent = () => {
    switch (pageIndex) {
      case 0:
        return renderFirstNameForm();
      case 1:
        return renderLastNameForm();
      case 2:
        return renderDateForm();
      default:
        return renderFirstNameForm();
    }
  };

  const isLastPage = () => pageIndex === Object.keys(userDetails).length - 1;
  const isFirstPage = () => pageIndex === 0;

  const handlePrevPage = () => {
    if (isFirstPage()) {
      handleBack();
      return;
    } // Handle go back
    setPageIndex((currentIndex) => Math.min(currentIndex - 1));
  };

  const handleNextPage = async () => {
    if (isLastPage()) {
      await handleCreateUser();
      return;
    }
    setPageIndex((currentIndex) => Math.min(currentIndex + 1));
  };

  const handleCreateUser = async () => {
    try {
      // TODO: Setup ability to update store with userDetails
      await createUser({
        email,
        id: userId,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        dateOfBirth: userDetails.dateOfBirth.getTime(),
      });
      // TODO: Show loading state when creating...
      handleUserCreated();
    } catch (err) {
      console.warn("Could not create user", err);
      // TODO: Show an error to the user...
    }
  };

  return (
    <OnboardingInitialScreenContainer>
      <TitleStyle>Profile Setup</TitleStyle>
      <TextStyle>Let's get to know you!</TextStyle>
      {renderContent()}
      <PrimaryButton
        text={isLastPage() ? "SUBMIT" : "NEXT"}
        onPress={handleNextPage}
      />
      <PrimaryButton
        text={isFirstPage() ? "CANCEL" : "BACK"}
        onPress={handlePrevPage}
      />
    </OnboardingInitialScreenContainer>
  );
};
