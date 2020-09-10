import React, { createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import AppNavigator from "./src/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
// import { AuthContextWrapper } from "./src/context/AuthContext";

const App = () => {
  // React.useEffect(() => {
  //   async function getUserDetails() {
  //     const metaData: any = await auth.readUserMetaData();
  //     if (metaData && metaData.isStudent) {
  //       try {
  //         const details = await getStudentDetails(metaData._id);
  //         setUserDetails(details);
  //       } catch (err) {
  //         console.error('An error occurred when getting student details', err);
  //       }
  //     }
  //   }
  //   getUserDetails();
  // }, [auth]);

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <AuthContextWrapper> */}
          <AppNavigator />
          {/* </AuthContextWrapper> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
