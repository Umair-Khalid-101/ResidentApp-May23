import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import * as Font from "expo-font";
import Back from "../Svgs/Back";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../constans/colors";
import { MaterialIcons } from "@expo/vector-icons";

// CONTEXT
import { useStateContext } from "../context";
import {
  addDoc,
  db,
  setDoc,
  doc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  collection,
  query,
  where,
  getDocs,
} from "../services";
import Loader from "../components/Loader";

export default function GenerateRequest() {
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const { storedCredentials, onRouteValet, setonRouteValet } =
    useStateContext();
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [onRouteValetData, setonRouteValetData] = useState(null);
  const [item, setItem] = useState(null);
  const [timeDiff, setTimeDiff] = useState(null);

  // console.log("ONROUTEVALET:", onRouteValet);
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
    setInterval(() => {
      getContinuousNotifications();
    }, 1000 * 60);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  // ON ROUTE VALET DATA
  const getOnRouteValet = async () => {
    const valetQuery = query(
      collection(db, "users"),
      where("email", "==", onRouteValet)
    );
    const valetQuerySnapshot = await getDocs(valetQuery);

    if (valetQuerySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      setIsloading(false);
      return;
    }

    try {
      valetQuerySnapshot?.forEach((doc) => {
        // console.log("OnRouteValetData-1: ", doc.data());
        doc.data();
        setonRouteValetData(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getContinuousNotifications = async () => {
    // GET DETAILS OF NOTIFICATIONS
    // setIsloading(true);
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "notifications"),
      where("sentTo", "==", storedCredentials?.propertyname)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      // setIsloading(false);
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
          time: doc?.data()?.time,
        });
      });
      let notifications = reverseArray(myData);
      // console.log("NOTIFICATIONS-1:", notifications[0]);
      setItem(notifications[0]);
      const diff = diffInMinutes(notifications[0]?.time, Date.now());
      // console.log("Time Difference:", diff);
      setTimeDiff(diff);
      setonRouteValet(notifications[0]?.sentBy);
      setData(notifications);
      // await getOnRouteValet();
      // setIsloading(false);
    } catch (error) {
      // Alert.alert(error);
      console.log(error);
      // setIsloading(false);
    }
  };

  const getNotifications = async () => {
    // GET DETAILS OF NOTIFICATIONS
    setIsloading(true);
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "notifications"),
      where("sentTo", "==", storedCredentials?.propertyname)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      setIsloading(false);
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
          time: doc?.data()?.time,
        });
      });
      let notifications = reverseArray(myData);
      // console.log("NOTIFICATIONS-1:", notifications[0]);
      setItem(notifications[0]);
      const diff = diffInMinutes(notifications[0]?.time, Date.now());
      // console.log("Time Difference:", diff);
      setTimeDiff(diff);
      setonRouteValet(notifications[0]?.sentBy);
      setData(notifications);
      await getOnRouteValet();
      setIsloading(false);
    } catch (error) {
      // Alert.alert(error);
      // console.log(error);
      setIsloading(false);
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

  const handleRequest = async () => {
    setIsloading(true);
    try {
      const currentDate = new Date();
      const currentDayOfMonth = currentDate.getDate();
      const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
      const currentYear = currentDate.getFullYear();
      const dateString =
        currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
      // console.log("Date:", dateString);
      const timestamp = currentDate.getTime();
      const date = new Date(timestamp);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      let time = `${hours}:${minutes} ${ampm}`;
      // console.log(`Time is: `, time);
      const docRef = {
        sendingDate: dateString,
        sendingTime: time,
        title: "Please Pick Our Trash",
        apartment: storedCredentials?.apartment,
        propertyname: storedCredentials?.propertyname,
        sentTo: onRouteValet,
      };

      await setDoc(doc(db, "request", timestamp.toString()), docRef);
      await sendPushNotification(
        onRouteValetData?.expoToken ? onRouteValetData?.expoToken : "",
        onRouteValetData?.NotifToken ? onRouteValetData?.NotifToken : ""
      );
      setIsloading(false);
      navigation.navigate("PickupRequestSent");
    } catch (e) {
      console.error("Error adding document: ", e);
      // Alert.alert("Error Sending Request!");
      setIsloading(false);
    }
  };

  const sendPushNotification = async (expoToken, token) => {
    const Iosmessage = {
      to: expoToken,
      priority: "high",
      sound: "default",
      title: "Muns Trash Valet",
      body: `You have a new PickUp Request from\nProperty: ${storedCredentials?.propertyname}\nApartment: ${storedCredentials?.apartment}`,
    };

    // SEND NOTIFICATION
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Iosmessage),
    });

    const message = {
      to: token,
      priority: "normal",
      data: {
        experienceId: "@muns/valet",
        scopeKey: "@muns/valet",
        title: "Muns Trash Valet",
        message: `You have a new PickUp Request from\nProperty: ${storedCredentials?.propertyname}\nApartment: ${storedCredentials?.apartment}`,
      },
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAACyWutn4:APA91bH9RnpKrHCJhKTu4SD7GtCUgyqzfHyNj2hhDOfzrzWXZdSiO7anw2zO51l0kI_8j2smtuNPHwNWOzJ9wtXPd5xRtVD_W_DUdwbtVtKlBIKU2_s-3Jsn7pE024iQd0KOqUPx1RIe`,
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  // GET TIME DIFFERENCE IN MINUTES
  const diffInMinutes = (timestamp1, timestamp2) => {
    const diffInMillis = Math.abs(timestamp1 - timestamp2);
    const diffInMinutes = Math.floor(diffInMillis / 1000 / 60);
    return diffInMinutes;
  };

  return (
    <>
      {!isloading && (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.nav}>
              <TouchableOpacity
                style={{
                  width: "30%",
                  height: 50,
                }}
                onPress={() => navigation.navigate("TabNavigator")}
              >
                <Back
                  style={styles.back}
                  onPress={() => navigation.navigate("TabNavigator")}
                />
              </TouchableOpacity>
              {loaded ? <Text style={styles.text1}>Request Pickup</Text> : ""}
            </View>
            <View style={styles.greyline}></View>
            {item && item?.NotifCount === 4 && timeDiff < 20 ? (
              <TouchableOpacity style={styles.filebox}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={styles.colorbox}>
                    <AntDesign name="clockcircleo" size={24} color="white" />
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
                        <Text Text style={styles.text3}>
                          You can Request PickUp from Valet
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    {loaded ? (
                      <Text style={{ ...styles.text3, marginBottom: "3%" }}>
                        You have {20 - timeDiff} minutes to Request PickUp
                      </Text>
                    ) : (
                      ""
                    )}
                    {loaded ? (
                      <Text style={styles.text5}>
                        After that it won't be possible for us to pickup
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.filebox,
                  backgroundColor: colors.lightgrey,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      ...styles.colorbox,
                      backgroundColor: colors.red,
                    }}
                  >
                    <AntDesign name="closecircle" size={24} color="white" />
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
                        <Text Text style={styles.text3}>
                          You can not Request PickUp from Valet
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    {loaded ? (
                      <Text style={styles.text3}>
                        There is no Ongoing Pickup
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
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
              {loaded ? <Text style={styles.text8}>Location</Text> : ""}
              {/* <TouchableOpacity
            style={{
              width: 80,
              height: 40,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.primary,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("EditPickupLocation")}
          >
            <MaterialIcons name="edit" size={16} color={colors.primary} />
            {loaded ? <Text style={styles.text2}>Edit</Text> : ""}
          </TouchableOpacity> */}
            </View>
            <View style={styles.dataview}>
              {loaded ? <Text style={styles.text7}>Property</Text> : ""}
              {loaded ? (
                <Text style={styles.text9}>
                  {storedCredentials?.propertyname}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View style={styles.dataview}>
              {loaded ? <Text style={styles.text7}>Apartment #</Text> : ""}
              {loaded ? (
                <Text style={styles.text9}>{storedCredentials?.apartment}</Text>
              ) : (
                ""
              )}
            </View>
            <View style={styles.dataview}>
              {loaded ? <Text style={styles.text7}>City</Text> : ""}
              {loaded ? (
                <Text style={styles.text9}>{storedCredentials?.cityname}</Text>
              ) : (
                ""
              )}
            </View>
            <View style={styles.dataview}>
              {loaded ? <Text style={styles.text7}>State</Text> : ""}
              {loaded ? (
                <Text style={styles.text9}>{storedCredentials?.statename}</Text>
              ) : (
                ""
              )}
            </View>
            {item && item?.NotifCount === 4 && timeDiff < 20 && (
              <TouchableOpacity style={styles.button} onPress={handleRequest}>
                {loaded ? (
                  <Text style={styles.text10}>Request Pickup</Text>
                ) : (
                  ""
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
      {isloading && <Loader title={"Loading..."} />}
    </>
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
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    color: colors.primary,
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
    height: 100,
    alignSelf: "center",
    backgroundColor: colors.lightyellow,
    borderRadius: 16,
    marginTop: 10,
    justifyContent: "center",
  },

  colorbox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.yellow,
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
  text9: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginTop: 10,
  },

  text5: {
    fontSize: 10,
    color: colors.grey,
    fontFamily: "CircularStd",
    marginLeft: 10,
    marginTop: 2,
  },
  text7: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: "CircularStd",

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
    fontSize: 16,
    fontFamily: "CircularStd",
  },
  dataview: {
    display: "flex",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    width: "90%",
    display: "flex",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  text10: {
    color: "white",
    fontFamily: "CircularStd",
  },
});
