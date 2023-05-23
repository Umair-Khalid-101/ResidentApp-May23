import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, signOut } from "../services";
import Loader from "../components/Loader";
import { useStateContext } from "../context";

export default function Setting() {
  const { setStoredCredentials } = useStateContext();
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // HANDLE SIGN OUT
  const handleSignOut = async () => {
    const auth = getAuth();
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        AsyncStorage.removeItem("userCredentials")
          .then(() => {
            setStoredCredentials(null);
            navigation.replace("MainPage");
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          {loaded ? <Text style={styles.text1}>Setting</Text> : ""}
          <View style={styles.greyline}></View>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("AccountSetting")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              {loaded ? <Text style={styles.text2}>Account Setting</Text> : ""}
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("WriteUs")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="file-edit-outline"
                size={24}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              {loaded ? <Text style={styles.text2}>Write To Us</Text> : ""}
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("TermsConditions")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="file-text-o"
                size={22}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              {loaded ? (
                <Text style={styles.text2}>Terms & Conditions</Text>
              ) : (
                ""
              )}
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="file-lock-outline"
                size={24}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />

              {loaded ? <Text style={styles.text2}>Privacy Policy</Text> : ""}
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("AboutUs")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <AntDesign
                name="exclamationcircleo"
                size={22}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              {loaded ? <Text style={styles.text2}>About Us</Text> : ""}
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.redbutton} onPress={handleSignOut}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons
                name="power-outline"
                size={22}
                color="red"
                style={{ marginLeft: 20 }}
              />
              {loaded ? <Text style={styles.text2}>Sign Out</Text> : ""}
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Signing Out!"} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text1: {
    fontFamily: "CircularStd",
    fontSize: 16,
    marginTop: "5%",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 20,
  },
  buttoncontainer: {
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 1,
    marginTop: "6%",
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 1,
  },
  redbutton: {
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",

    borderRadius: 12,
    backgroundColor: "#FFCCCB",

    marginTop: 30,
  },
});
