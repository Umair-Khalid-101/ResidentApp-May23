import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constans/colors";

import { MaterialIcons } from "@expo/vector-icons";

import Vector from "../Svgs/Vector";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
function AccountCreated(props) {
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
      <View style={styles.logo}>
        <Vector />
        {loaded ? (
          <Text
            style={{
              // backgroundColor: "pink",
              alignSelf: "center",
              color: colors.primary,
              fontFamily: "Montserrat",
              marginTop: "2%",
              fontSize: 24,
            }}
          >
            Muns Trash Valet
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.greyline}></View>
      <View style={styles.parent}>
        <View style={styles.greencircle}>
          <MaterialIcons name="done" size={24} color={colors.green} />
        </View>
        {loaded ? <Text style={styles.text1}>Account Created</Text> : ""}
        {loaded ? (
          <Text style={styles.text2}>
            You have successfully created your account.
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.getstarted}
          onPress={() => navigation.navigate("SignIn")}
        >
          {loaded ? <Text style={styles.getstartedtext}>Go to Home</Text> : ""}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AccountCreated;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 30,
  },
  parent: {
    display: "flex",
    width: "90%",
    alignSelf: "center",
  },
  greencircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    borderWidth: 1.5,
    borderColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  text1: {
    fontSize: 28,
    fontFamily: "CircularStd",
    marginTop: 10,

    letterSpacing: -0.5,
  },
  text2: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 5,
  },
  getstarted: {
    width: "90%",
    backgroundColor: "#246BFD",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,

    alignSelf: "center",
  },
  getstartedtext: {
    color: "white",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
});
