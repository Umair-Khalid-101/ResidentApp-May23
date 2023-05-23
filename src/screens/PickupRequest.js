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
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constans/colors";
export default function PickupRequest() {
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
        {loaded ? <Text style={styles.text1}>Pickup Requests</Text> : ""}
      </View>
      <View style={styles.greyline}></View>
      {loaded ? <Text style={styles.text2}>Today</Text> : ""}
      <TouchableOpacity
        style={styles.filebox}
        onPress={() => navigation.navigate("ViewPickupRequest")}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.colorbox}>
            <AntDesign name="filetext1" size={24} color={colors.primary} />
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
              {loaded ? <Text style={styles.text3}>Pickup Requests</Text> : ""}
              {loaded ? <Text style={styles.text4}>(Accepted)</Text> : ""}
            </View>
            {loaded ? <Text style={styles.text5}>2:24 P.M.</Text> : ""}
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#94A1B2"
            style={{
              position: "absolute",

              right: 20,
              alignSelf: "center",
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filebox}
        onPress={() => navigation.navigate("ViewPickupRequest")}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.colorbox}>
            <AntDesign name="filetext1" size={24} color={colors.primary} />
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
              {loaded ? <Text style={styles.text3}>Pickup Requests</Text> : ""}
              {loaded ? <Text style={styles.text6}>(Expired)</Text> : ""}
            </View>
            {loaded ? <Text style={styles.text5}>1:30 P.M.</Text> : ""}
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#94A1B2"
            style={{
              position: "absolute",

              right: 20,
              alignSelf: "center",
            }}
          />
        </View>
      </TouchableOpacity>
      {loaded ? <Text style={styles.text2}>12 Feb, 2023</Text> : ""}
      <TouchableOpacity
        style={styles.filebox}
        onPress={() => navigation.navigate("ViewPickupRequest")}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.colorbox}>
            <AntDesign name="filetext1" size={24} color={colors.primary} />
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
              {loaded ? <Text style={styles.text3}>Pickup Requests</Text> : ""}
              {loaded ? <Text style={styles.text4}>(Accepted)</Text> : ""}
            </View>
            {loaded ? <Text style={styles.text5}>2:24 P.M.</Text> : ""}
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#94A1B2"
            style={{
              position: "absolute",

              right: 20,
              alignSelf: "center",
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filebox}
        onPress={() => navigation.navigate("ViewPickupRequest")}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.colorbox}>
            <AntDesign name="filetext1" size={24} color={colors.primary} />
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
              {loaded ? <Text style={styles.text3}>Pickup Requests</Text> : ""}
              {loaded ? <Text style={styles.text6}>(Expired)</Text> : ""}
            </View>
            {loaded ? <Text style={styles.text5}>1:30 P.M.</Text> : ""}
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#94A1B2"
            style={{
              position: "absolute",

              right: 20,
              alignSelf: "center",
            }}
          />
        </View>
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
  filebox: {
    display: "flex",
    width: "90%",
    height: 70,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 1,
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
    backgroundColor: colors.lightblue,
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
    fontSize: 12,
    color: colors.grey,
    fontFamily: "CircularStd",
    marginLeft: 10,
  },
  text6: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 10,
    color: "red",
  },
});
