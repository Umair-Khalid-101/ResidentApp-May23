import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Back from "../Svgs/Back";
import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constans/colors";
import { Ionicons } from "@expo/vector-icons";
export default function ViewPickupRequest() {
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
        <TouchableOpacity>
          <View>
            <Back
              style={styles.back}
              onPress={() => navigation.navigate("TabNavigator")}
            />
          </View>
        </TouchableOpacity>
        {loaded ? <Text style={styles.text1}>View Pickup Request</Text> : ""}
      </View>
      <View style={styles.greyline}></View>
      <TouchableOpacity
        style={styles.filebox}
        onPress={() => navigation.navigate("Notification")}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.colorbox}>
            <MaterialCommunityIcons name="bus-school" size={24} color="white" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {loaded ? (
                <Text style={styles.text3}>Valet will be arriving soon</Text>
              ) : (
                ""
              )}
            </View>
            {loaded ? (
              <Text style={styles.text5}>
                Your pickup request has been accepted successfully
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewbutton}
        onPress={() => navigation.navigate("Status")}
      >
        {loaded ? <Text style={styles.text6}>View Status</Text> : ""}
      </TouchableOpacity>
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
        {loaded ? <Text style={styles.text9}>Lake Fairway</Text> : ""}
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
        {loaded ? <Text style={styles.text8}>Apartment #</Text> : ""}
        {loaded ? <Text style={styles.text9}>267-ADK</Text> : ""}
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
        {loaded ? <Text style={styles.text9}>El Paso</Text> : ""}
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
        {loaded ? <Text style={styles.text9}>Texas</Text> : ""}
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
        {loaded ? <Text style={styles.text8}>Time</Text> : ""}
        {loaded ? <Text style={styles.text9}>2:25 P.M.</Text> : ""}
      </View>
      <View style={styles.greyline2}></View>
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
    marginTop: 60,
  },
  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,
    position: "absolute",
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
    marginTop: 50,
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
});
