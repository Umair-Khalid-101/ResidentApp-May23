import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import * as Font from "expo-font";
import Vector from "../Svgs/Vector";
import MunsTrashValet from "../Svgs/MunsTrashValet";
import { colors } from "../constans/colors";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Loader from "../components/Loader";
import { useStateContext } from "../context";
import { collection, query, where, getDocs, db } from "../services";

function WelcomePage(props) {
  const { storedCredentials, setonRouteValet } = useStateContext();
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);

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
    // getNotifications();
    setInterval(() => {
      getContinuousNotifs();
    }, 5000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  const getContinuousNotifs = async () => {
    // console.log("Continuous Notifications...");
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "notifications"),
      where("sentTo", "==", storedCredentials?.propertyname)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      // setIsLoading(false);
      return;
    }

    try {
      querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc?.id, " => ", doc?.data());
        myData.push({
          id: doc?.id,
          NotifCount: doc?.data()?.NotifCount,
          body: doc?.data()?.body,
          sendingDate: doc?.data()?.sendingDate,
          sendingTime: doc?.data()?.sendingTime,
          sentBy: doc?.data()?.sentBy,
          title: doc?.data()?.title,
        });
      });
      let notifications = reverseArray(myData);
      // console.log("NOTIFICATIONS:", notifications[0]);
      setItem(notifications[0]);
      setonRouteValet(notifications[0]?.sentBy);
      setData(notifications);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const getNotifications = async () => {
    // GET DETAILS OF NOTIFICATIONS
    // console.log("Getting Notifications...");
    setIsLoading(true);
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "notifications"),
      where("sentTo", "==", storedCredentials?.propertyname)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      setIsLoading(false);
      return;
    }

    try {
      querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc?.id, " => ", doc?.data());
        myData.push({
          id: doc?.id,
          NotifCount: doc?.data()?.NotifCount,
          body: doc?.data()?.body,
          sendingDate: doc?.data()?.sendingDate,
          sendingTime: doc?.data()?.sendingTime,
          sentBy: doc?.data()?.sentBy,
          title: doc?.data()?.title,
        });
      });
      let notifications = reverseArray(myData);
      // console.log("NOTIFICATIONS:", notifications[0]);
      setItem(notifications[0]);
      setonRouteValet(notifications[0]?.sentBy);
      setData(notifications);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error);
      setIsLoading(false);
    }
  };

  // REVERSE NOTIFS ARRAY
  function reverseArray(arr) {
    // Make a copy of the original array
    const copyArr = [...arr];
    // Loop through half of the array and swap elements
    for (let i = 0; i < Math.floor(copyArr.length / 2); i++) {
      const temp = copyArr[i];
      copyArr[i] = copyArr[copyArr.length - 1 - i];
      copyArr[copyArr.length - 1 - i] = temp;
    }
    // Return the reversed array
    return copyArr;
  }

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.parentcontainer}>
              <View style={styles.container1}>
                <ImageBackground
                  source={require("../../assets/Dust.png")}
                  style={styles.dust}
                >
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
                          fontSize: 20,
                        }}
                      >
                        Muns Trash Valet
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <View style={styles.bannertext}>
                      <View style={styles.secondtext}>
                        {loaded ? (
                          <Text style={styles.hitext}>Hello There</Text>
                        ) : (
                          ""
                        )}
                      </View>
                      {loaded ? (
                        <Text style={styles.welcometext}>
                          Welcome to Munsapp!
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    <Image
                      source={require("../../assets/man.png")}
                      style={styles.man}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.container2}>
                <View style={styles.parent}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: colors.lightgreen,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      marginHorizontal: "5%",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="bell-ring-outline"
                      size={24}
                      color={colors.green}
                    />
                  </View>
                  <Text style={styles.description} numberOfLines={5}>
                    Munsapp help residents with daily notifications and
                    reminders, so they don’t miss their scheduled pick up time
                    from our valets
                  </Text>
                </View>
              </View>
              {loaded ? (
                <Text style={styles.recentnoti}>Recent Notifications</Text>
              ) : (
                ""
              )}
              <TouchableOpacity
                style={styles.buttoncontainer}
                onPress={() => navigation.navigate("Notification")}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "pink",
                    height: "100%",
                    borderRadius: 12,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: colors.lightblue,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="timer-sand-empty"
                      size={24}
                      color="#24A2FD"
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // backgroundColor: "yellow",
                      width: "80%",
                    }}
                  >
                    {loaded ? (
                      <Text style={styles.text4}>View All Notifications</Text>
                    ) : (
                      ""
                    )}
                    {loaded ? (
                      <Text style={styles.text5}>
                        See All the previous notifications
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
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

              {loaded && item ? (
                <Text style={styles.recentnoti}>Ongoing PickUp</Text>
              ) : (
                ""
              )}
              {item && (
                <TouchableOpacity
                  style={styles.ongoingbuttoncontainer}
                  onPress={() => {
                    navigation.navigate("Status", {
                      item,
                    });
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor: "blue",
                      height: "100%",
                      width: "100%",
                      borderRadius: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.lightblue,
                        marginRight: "3%",
                      }}
                    >
                      <>
                        {item && item?.NotifCount === 1 && (
                          <AntDesign
                            name="clockcircleo"
                            size={24}
                            color="#FFB317"
                          />
                        )}
                        {item && item?.NotifCount === 2 && (
                          <MaterialCommunityIcons
                            name="timer-sand-empty"
                            size={24}
                            color="#24A2FD"
                          />
                        )}
                        {item && item.NotifCount === 3 && (
                          <Feather name="trash-2" size={24} color="#7624FD" />
                        )}
                        {item && item?.NotifCount === 4 && (
                          <MaterialCommunityIcons
                            name="bus-school"
                            size={24}
                            color="#FD247F"
                          />
                        )}
                        {item && item?.NotifCount === 5 && (
                          <MaterialCommunityIcons
                            name="check-all"
                            size={24}
                            color="#1ECB2F"
                          />
                        )}
                      </>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // backgroundColor: "yellow",
                        width: "70%",
                      }}
                    >
                      {loaded ? (
                        <Text style={styles.textbody} numberOfLines={5}>
                          {item && item?.NotifCount === 5
                            ? "No Ongoing Trash PickUp!"
                            : item?.body}
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#94A1B2"
                    />
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.bluebox}
                onPress={() => navigation.navigate("GenerateRequest")}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    {loaded ? (
                      <Text style={styles.text6}>Request Pickup</Text>
                    ) : (
                      ""
                    )}
                    {loaded ? (
                      <Text style={styles.text7}>
                        Ask for Muns TrashValet pickup
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: colors.lightblue,
                      marginRight: 20,
                      borderWidth: 1,
                      borderColor: colors.grey,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="bus-school"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {loaded ? (
                <Text style={styles.recentnoti}>Follow Us On</Text>
              ) : (
                ""
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                }}
              >
                <TouchableOpacity
                  style={styles.social}
                  onPress={() => Linking.openURL("https://www.facebook.com/")}
                >
                  <FontAwesome5 name="facebook" size={30} color={colors.grey} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.social}
                  onPress={() => Linking.openURL("https://www.instagram.com/")}
                >
                  <Entypo
                    name="instagram-with-circle"
                    size={32}
                    color={colors.grey}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.social}
                  onPress={() => Linking.openURL("https://www.twitter.com/")}
                >
                  <Entypo
                    name="twitter-with-circle"
                    size={32}
                    color={colors.grey}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.social}
                  onPress={() => Linking.openURL("https://www.youtube.com/")}
                >
                  <Entypo
                    name="youtube-with-circle"
                    size={32}
                    color={colors.grey}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Getting Data..."} />}
    </>
  );
}

export default WelcomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    left: 40,
    top: 20,
  },
  logotext: {
    marginTop: 10,
  },
  bannertext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  parentcontainer: {
    marginTop: 10,
  },
  container1: {
    width: "90%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 15,
    display: "flex",
    alignSelf: "center",
    elevation: 1,
  },
  container2: {
    width: "90%",
    height: 90,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 15,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 1,
  },

  dust: {
    width: "100%",
    height: "100%",
  },

  man: {
    width: 70,
    height: 90,

    marginLeft: 60,
  },
  hitext: {
    fontSize: 24,
    fontFamily: "CircularStd-Bold",
    color: "black",
    marginTop: 15,
  },

  welcometext: {
    fontSize: 14,
    left: 10,
    fontFamily: "CircularStd",
    color: colors.grey,
  },

  parent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "pink",
    alignItems: "center",
    height: "100%",
    borderRadius: 12,
    gap: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: "CircularStd",
    width: "70%",
    lineHeight: 15,
    marginRight: "10%",
    // backgroundColor: "yellow",
  },
  recentnoti: {
    fontSize: 18,
    fontFamily: "CircularStd-Bold",
    marginTop: "5%",
    marginLeft: "5%",
  },
  buttoncontainer: {
    width: "90%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 1,
    marginTop: 10,
  },
  ongoingbuttoncontainer: {
    width: "90%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 1,
    marginTop: 10,
  },
  text4: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 1,
  },
  textbody: {
    fontFamily: "CircularStd",
    fontSize: 14,
    // backgroundColor: "yellow",
    width: "100%",
  },
  text5: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
    color: "#94A1B2",
  },
  bluebox: {
    height: 100,
    width: "90%",
    backgroundColor: colors.primary,
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 16,
    justifyContent: "center",
  },
  text6: {
    color: "white",
    fontSize: 16,
    fontFamily: "CircularStd",
    marginLeft: 20,
    marginTop: 5,
  },
  text7: {
    color: "white",
    fontSize: 12,
    fontFamily: "CircularStd",
    marginLeft: 20,
    marginTop: 5,
  },
  social: {
    display: "flex",
    height: 50,
    width: "16%",
    borderRadius: 16,
    elevation: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "3%",
    marginHorizontal: "3%",
  },
});
