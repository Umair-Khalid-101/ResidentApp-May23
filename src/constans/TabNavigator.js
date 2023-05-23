import React, { useState, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";

import { useNotifications } from "../services/pushNotifs";
import { useStateContext } from "../context";
import Loader from "../components/Loader";
import WelcomePage from "../screens/WelcomePage";
// import PickupRequest from "../screens/PickupRequest";
import Setting from "../screens/Setting";
import Notification from "../screens/Notification";

const TabNavigator = () => {
  const { storedCredentials, updatingToken } = useStateContext();
  // console.log("STORED CREDENTIALS", storedCredentials);

  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();
  const Tab = createBottomTabNavigator();
  // const notificationListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: true,
  //     }),
  //   });
  //   // notificationListener.current =
  //   //   Notifications.addNotificationReceivedListener();
  //   const responseListener =
  //     Notifications.addNotificationResponseReceivedListener(
  //       handleNotificationResponse
  //     );

  //   return () => {
  //     if (responseListener) {
  //       Notifications.removeNotificationSubscription(responseListener);
  //     }
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      registerForPushNotificationsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      // notificationListener.current =
      //   Notifications.addNotificationReceivedListener();
      const responseListener =
        Notifications.addNotificationResponseReceivedListener(
          handleNotificationResponse
        );

      return () => {
        if (responseListener) {
          Notifications.removeNotificationSubscription(responseListener);
        }
      };
    }, [])
  );

  return (
    <>
      {!updatingToken && (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "WelcomePage") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Pickup Request") {
                iconName = focused ? "filetext1" : "filetext1";
              } else if (route.name === "Notification") {
                iconName = focused ? "bells" : "bells";
              } else if (route.name === "Setting") {
                iconName = focused ? "setting" : "setting";
              }

              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#246BFD",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{ headerShown: false }}
          />
          {/* <Tab.Screen
            name="Pickup Request"
            component={PickupRequest}
            options={{ headerShown: false }}
          /> */}
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      )}
      {updatingToken && <Loader title={"Getting Data..."} />}
    </>
  );
};

export default TabNavigator;
