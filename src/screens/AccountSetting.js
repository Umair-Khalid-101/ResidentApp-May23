import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Back from "../Svgs/Back";
import { colors } from "../constans/colors";

import { useStateContext } from "../context/index";

export default function AccountSetting() {
  const { storedCredentials } = useStateContext();
  // console.log("USER:", storedCredentials);
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);

  const loadfonts = async () => {
    await Font.loadAsync({
      CircularStd: require("../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../assets/CircularStd-Bold.otf"),
      Montserrat: require("../../assets/Montserrat.ttf"),
    });
    setloaded(true);
  };
  useEffect(() => {
    loadfonts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={{
            width: "30%",
            // backgroundColor: "blue",
            height: 50,
          }}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Back
            style={styles.back}
            onPress={() => navigation.navigate("TabNavigator")}
          />
        </TouchableOpacity>
        {loaded ? <Text style={styles.text1}>Account Setting</Text> : ""}
      </View>
      <View style={styles.greyline}></View>
      {loaded ? <Text style={styles.text7}>Personal Details</Text> : ""}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>Email</Text> : ""}
        {loaded ? (
          <Text style={styles.text9}>{storedCredentials?.email}</Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline2}></View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>Password</Text> : ""}
        {loaded ? <Text style={styles.text9}>●●●●●●●●●●●</Text> : ""}
      </View> */}
      {/* <View style={styles.greyline2}></View> */}
      {loaded ? <Text style={styles.text7}>Location Details</Text> : ""}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>Apartment #</Text> : ""}
        {loaded && storedCredentials?.apartment ? (
          <Text style={styles.text9}>{storedCredentials?.apartment}</Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline2}></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>State</Text> : ""}
        {loaded ? (
          <Text style={styles.text9}>{storedCredentials?.statename}</Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline2}></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>City</Text> : ""}
        {loaded ? (
          <Text style={styles.text9}>{storedCredentials?.cityname}</Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline2}></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>Property</Text> : ""}
        {loaded ? (
          <Text style={styles.text9}>{storedCredentials?.propertyname}</Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline2}></View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        {loaded ? <Text style={styles.text8}>Time</Text> : ""}
        {loaded ? <Text style={styles.text9}>2:25 P.M.</Text> : ""}
      </View>
      <View style={styles.greyline2}></View> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditAccountSetting")}
      >
        {loaded ? <Text style={styles.text10}>Edit Account Setting</Text> : ""}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    display: "flex",
    marginTop: "5%",
  },
  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,
    position: "absolute",
  },
  text7: {
    fontSize: 16,
    fontFamily: "CircularStd",
    left: 16,
    marginTop: 20,
  },
  back: {
    alignSelf: "flex-start",

    position: "absolute",

    left: 16,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
  },
  greyline2: {
    width: "90%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 10,
    alignSelf: "center",
  },
  filebox: {
    display: "flex",
    width: "90%",
    height: 70,
    alignSelf: "center",
    backgroundColor: colors.lightgreen,

    borderRadius: 16,
    marginTop: 10,

    justifyContent: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: colors.grey,
    marginTop: 10,
    left: 16,
  },
  colorbox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.green,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text3: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 10,
  },
  text4: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 10,
    color: colors.green,
  },
  text5: {
    fontSize: 10,
    color: colors.grey,
    fontFamily: "CircularStd",
    marginLeft: 10,
    marginTop: 2,
  },
  text6: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,

    color: "white",
  },
  viewbutton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  text8: {
    fontSize: 14,
    fontFamily: "CircularStd",
  },
  text9: {
    fontFamily: "CircularStd",
    color: colors.grey,
    fontSize: 14,
  },
  button: {
    width: "90%",
    display: "flex",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text10: {
    color: "white",
    fontFamily: "CircularStd",
  },
});
