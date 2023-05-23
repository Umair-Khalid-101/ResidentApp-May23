import {
  StyleSheet,
  Text,
  View,
  // Image,
  SafeAreaView,
  // Platform,
  TouchableOpacity,
  TextInput,
  // ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Back from "../Svgs/Back";
// import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
// import { Feather } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../constans/colors";

export default function EditPickupLocation() {
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);

  const data = [
    { value: "Independance Place" },
    { value: "Lake Fairway" },
    { value: "Sun Hollow" },
    { value: "Ridgemar" },
    { value: "Spring Park" },
    { value: "Cliffside at Mountain Park" },
    { value: "Desert Commons" },
  ];
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
              onPress={() => navigation.navigate("GenerateRequest")}
            />
          </View>
        </TouchableOpacity>
        {loaded ? <Text style={styles.text1}>Edit Location</Text> : ""}
      </View>
      <View style={styles.greyline}></View>

      {loaded ? <Text style={styles.text3}>State</Text> : ""}
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        boxStyles={styles.input}
        placeholder=" Select State"
        inputStyles={{
          fontFamily: "CircularStd",
          width: "80%",
          alignSelf: "center",
        }}
        dropdownTextStyles={{ fontFamily: "CircularStd" }}
        dropdownStyles={{
          width: "90%",
          alignSelf: "center",
        }}
      />
      {loaded ? <Text style={styles.text3}>City</Text> : ""}
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        boxStyles={styles.input}
        placeholder=" Select State"
        inputStyles={{
          fontFamily: "CircularStd",
          width: "80%",
          alignSelf: "center",
        }}
        dropdownTextStyles={{ fontFamily: "CircularStd" }}
        dropdownStyles={{
          width: "90%",
          alignSelf: "center",
        }}
      />
      {loaded ? <Text style={styles.text3}>Property</Text> : ""}
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        boxStyles={styles.input}
        placeholder=" Select State"
        inputStyles={{
          fontFamily: "CircularStd",
          width: "80%",
          alignSelf: "center",
        }}
        dropdownTextStyles={{ fontFamily: "CircularStd" }}
        dropdownStyles={{
          width: "90%",
          alignSelf: "center",
        }}
      />
      {loaded ? <Text style={styles.text3}>Apartment #</Text> : ""}
      <TextInput style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GenerateRequest")}
      >
        {loaded ? <Text style={styles.text10}>Save Changes</Text> : ""}
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
  text3: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 30,
    left: 16,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,

    paddingLeft: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
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
