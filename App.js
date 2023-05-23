import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainPage from "./src/screens/MainPage";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import AccountCreated from "./src/screens/AccountCreated";
import WelcomePage from "./src/screens/WelcomePage";
import TabNavigator from "./src/constans/TabNavigator";
import PickupRequestSent from "./src/screens/PickupRequestSent";
import ViewPickupRequest from "./src/screens/ViewPickupRequest";
import GenerateRequest from "./src/screens/GenerateRequest";
import EditPickupLocation from "./src/screens/EditPickupLocation";
import AccountSetting from "./src/screens/AccountSetting";
import WriteUs from "./src/screens/WriteUs";
import AboutUs from "./src/screens/AboutUs";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import TermsConditions from "./src/screens/TermsConditions";

import Status from "./src/screens/Status";
import EditAccountSetting from "./src/screens/EditAccountSetting";
import SplashScreen from "./src/screens/SplashScreen";
const Stack = createNativeStackNavigator();

import { StateContextProvider } from "./src/context";

// APP LOADING
import AppLoading from "expo-app-loading";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  // const { appReady, setAppReady, storedCredentials, setStoredCredentials } =
  //   useStateContext();
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState();
  // CHECK CREDENTIALS
  const checkCredentials = async () => {
    AsyncStorage.getItem("userCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <StateContextProvider>
      <StatusBar style="light" backgroundColor="#246BFD" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={`${storedCredentials ? "TabNavigator" : "Splash"}`}
        >
          {storedCredentials ? (
            <>
              <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WelcomePage"
                component={WelcomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PickupRequestSent"
                component={PickupRequestSent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewPickupRequest"
                component={ViewPickupRequest}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GenerateRequest"
                component={GenerateRequest}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditPickupLocation"
                component={EditPickupLocation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountSetting"
                component={AccountSetting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WriteUs"
                component={WriteUs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TermsConditions"
                component={TermsConditions}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Status"
                component={Status}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditAccountSetting"
                component={EditAccountSetting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountCreated"
                component={AccountCreated}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WelcomePage"
                component={WelcomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PickupRequestSent"
                component={PickupRequestSent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewPickupRequest"
                component={ViewPickupRequest}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GenerateRequest"
                component={GenerateRequest}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditPickupLocation"
                component={EditPickupLocation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountSetting"
                component={AccountSetting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WriteUs"
                component={WriteUs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TermsConditions"
                component={TermsConditions}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Status"
                component={Status}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditAccountSetting"
                component={EditAccountSetting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountCreated"
                component={AccountCreated}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StateContextProvider>
  );
}

export default App;
