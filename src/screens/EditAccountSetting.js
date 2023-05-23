import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Back from "../Svgs/Back";
import { SelectList } from "react-native-dropdown-select-list";
import { useForm, Controller } from "react-hook-form";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../constans/colors";
import {
  query,
  collection,
  db,
  where,
  getDocs,
  doc,
  updateDoc,
} from "../services";
import Loader from "../components/Loader";
import { useStateContext } from "../context";

// GLOBAL VARIABLES
let docId;
let User;

export default function EditAccountSetting() {
  const { storedCredentials, setStoredCredentials } = useStateContext();
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cityname, setcityname] = useState(null);
  const [statename, setstatename] = useState(null);
  const [propertyname, setpropertyname] = useState(null);
  const [userData, setUserData] = useState(null);

  const data = [
    { value: "Independance Place" },
    { value: "Lake Fairway" },
    { value: "Sun Hollow" },
    { value: "Ridgemar" },
    { value: "Spring Park" },
    { value: "Cliffside at Mountain Park" },
    { value: "Desert Commons" },
  ];
  const city = [{ value: "El Paso" }];
  const state = [{ value: "Texas" }];

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

  const { handleSubmit, control } = useForm({
    defaultValues: {
      apartment: `${
        storedCredentials?.apartment ? storedCredentials?.apartment : ""
      }`,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!statename) {
      data.statename = state[0].value;
    } else {
      data.statename = statename;
    }
    if (!cityname) {
      data.cityname = city[0].value;
    } else {
      data.cityname = cityname;
    }
    if (!propertyname) {
      data.propertyname = storedCredentials?.propertyname;
    } else {
      data.propertyname = propertyname;
    }

    try {
      // console.log(storedCredentials?.email);
      const q = query(
        collection(db, "users"),
        where("email", "==", storedCredentials?.email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot?.empty) {
        // console.log("NO DATA");
        setIsLoading(false);
        return;
      }

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        docId = doc.id;
        User = doc.data();
        setUserData(User);
        // console.log("User:", User);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("1-Error:", error);
      setIsLoading(false);
    }

    setIsLoading(true);
    try {
      // console.log(data);
      // console.log("userData:", userData);
      const washingtonRef = doc(db, "users", docId);
      await updateDoc(washingtonRef, {
        statename: data?.statename,
        cityname: data?.cityname,
        propertyname: data?.propertyname,
        apartment: data?.apartment,
      });
      User.statename = `${!statename ? state[0].value : statename}`;
      User.cityname = `${!cityname ? city[0].value : cityname}`;
      User.propertyname = `${
        !propertyname ? storedCredentials?.propertyname : propertyname
      }`;
      User.apartment = data.apartment;
      // console.log(User);
      AsyncStorage.setItem("userCredentials", JSON.stringify(User))
        .then(() => {
          setStoredCredentials(User);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
    } catch (error) {
      // Alert.alert(error);
      console.log("2-Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.nav}>
              <TouchableOpacity
                style={{
                  width: "30%",
                  height: 50,
                }}
                onPress={() => navigation.navigate("AccountSetting")}
              >
                <Back
                  style={styles.back}
                  onPress={() => navigation.navigate("AccountSetting")}
                />
              </TouchableOpacity>
              {loaded ? <Text style={styles.text1}>Account Setting</Text> : ""}
            </View>
            <View style={styles.greyline}></View>
            {loaded ? <Text style={styles.heading}>Personal Details</Text> : ""}
            {loaded ? <Text style={styles.text3}>Email</Text> : ""}
            <TextInput
              placeholder={
                storedCredentials?.email ? storedCredentials?.email : ""
              }
              style={styles.input}
              editable={false}
            />
            {/* {loaded ? <Text style={styles.text3}>Password</Text> : ""}
        <TextInput placeholder="●●●●●●●●●●●" style={styles.input} /> */}
            {loaded ? <Text style={styles.heading}>Location Details</Text> : ""}
            {loaded ? <Text style={styles.text3}>State</Text> : ""}
            <SelectList
              setSelected={(val) => setstatename(val)}
              data={state}
              boxStyles={styles.input}
              placeholder={
                storedCredentials?.statename
                  ? storedCredentials?.statename
                  : "Select State"
              }
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
              setSelected={(val) => setcityname(val)}
              data={city}
              boxStyles={styles.input}
              placeholder={
                storedCredentials?.cityname
                  ? storedCredentials?.cityname
                  : "Select City"
              }
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
              setSelected={(val) => setpropertyname(val)}
              data={data}
              boxStyles={styles.input}
              placeholder={
                storedCredentials?.propertyname
                  ? storedCredentials?.propertyname
                  : "Select Property"
              }
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
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="apartment"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              {loaded ? <Text style={styles.text10}>Save Changes</Text> : ""}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Saving Changes..."} />}
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
  back: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 16,
  },
  text3: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 20,
    left: 16,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "90%",
    marginTop: 10,
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  text10: {
    color: "white",
    fontFamily: "CircularStd",
  },
  heading: {
    fontFamily: "CircularStd",
    fontSize: 16,
    marginTop: 20,
    left: 16,
  },
});
