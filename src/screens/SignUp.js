import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Back from "../Svgs/Back";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Vector from "../Svgs/Vector";
import MunsTrashValet from "../Svgs/MunsTrashValet";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as yup from "yup";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStateContext } from "../context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  addDoc,
  collection,
  db,
  query,
  where,
  getDocs,
} from "../services";
import Loader from "../components/Loader";

function SignUp(props) {
  const { user, setUser, setStoredCredentials } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  // const [pickerValue, setPickerValue] = useState("JavaScript");
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  // const [selected, setSelected] = React.useState("");
  const [cityname, setcityname] = useState("");
  const [statename, setstatename] = useState("");
  const [propertyname, setpropertyname] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [properties, setProperties] = useState(null);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const city = [{ value: "El Paso" }];
  const state = [{ value: "Texas" }];

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .required("Password cannot be empty!")
      .min(8, "Password must be more than 8 charachters!"),
    confirmpassword: yup
      .string()
      .required("Confirm Password cannot be empty!")
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });

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
    getProperties();
  }, []);

  // GET PROPERTIES
  const getProperties = async () => {
    setIsLoading(true);
    const q = query(collection(db, "general"));

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      setIsLoading(false);
      return;
    }

    querySnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("SignUp", doc.data()?.properties);c
      setProperties(doc.data()?.properties);
    });
    setIsLoading(false);
  };

  const saveUser = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: values.email.toLowerCase(),
        password: values.password,
        statename: values.statename,
        propertyname: values.propertyname,
        cityname: values.cityname,
        apartment: values.apartment,
        role: "resident",
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // PERSIST USER
  const persistUser = async (credentials) => {
    await AsyncStorage.setItem("userCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.logo}>
              <Vector />
              {loaded ? (
                <Text
                  style={{
                    // backgroundColor: "pink",
                    alignSelf: "center",
                    color: "#246BFD",
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
            <Formik
              initialValues={{
                apartment: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={signUpValidationSchema}
              onSubmit={(values) => {
                (values.statename = statename),
                  (values.cityname = cityname),
                  (values.propertyname = propertyname),
                  console.log(values);

                const auth = getAuth();
                const email = values.email.toLowerCase();
                const password = values.password;
                setIsLoading(true);
                createUserWithEmailAndPassword(auth, email, password)
                  .then(async (userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    console.log(`Signed In as: ${user.uid}`);
                    await saveUser(values);

                    // SIGN IN
                    await signInWithEmailAndPassword(auth, email, password)
                      .then(async (userCredential) => {
                        const user = userCredential?.user;
                        setUser(user);
                        // console.log(`Signed In as ${user?.uid}`);

                        try {
                          // console.log(user?.email);
                          const q = query(
                            collection(db, "users"),
                            where("email", "==", user?.email)
                          );
                          const querySnapshot = await getDocs(q);
                          querySnapshot?.forEach(async (doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log(doc.id, " => ", doc.data());
                            const User = doc?.data();
                            // console.log("USER:", User);
                            setUser(User);
                            await persistUser(User);
                            if (User?.role === "resident") {
                              // Alert.alert("Success!", "Signed In as Resident!");
                              navigation.replace("TabNavigator");
                            } else {
                              Alert.alert(
                                "Error!",
                                "Make sure You're a Resident to Sign IN"
                              );
                            }
                            setIsLoading(false);
                          });
                        } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                        }
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        // console.log(errorCode);
                        const errorMessage = error.message;
                        // console.log(errorMessage);
                        Alert.alert("Error", "Wrong Email or Password!");
                        setIsLoading(false);
                      });
                    // reset();
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    Alert.alert("Error!", `${errorCode}\n${errorMessage}`);
                    setIsLoading(false);
                    // ..
                  });
              }}
            >
              {({ handleChange, handleSubmit, errors }) => (
                <>
                  <View style={styles.inputview}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Back
                        style={styles.back}
                        onPress={() => navigation.navigate("SignIn")}
                      />
                      {loaded ? (
                        <Text style={styles.SignIntext}>Sign Up</Text>
                      ) : (
                        ""
                      )}
                    </View>
                    {loaded ? (
                      <Text style={styles.text2}>
                        Get Started with Muns TrashValet
                      </Text>
                    ) : (
                      ""
                    )}
                    {loaded ? (
                      <Text style={styles.text3}>Email Address</Text>
                    ) : (
                      ""
                    )}
                    <TextInput
                      placeholder="name@example.com"
                      style={styles.input}
                      onChangeText={(text) => {
                        const trimmedText = text.trim();
                        handleChange("email")(trimmedText);
                      }}
                    />
                    {errors.email && (
                      <View>
                        <Text style={styles.errors}>{errors.email}</Text>
                      </View>
                    )}
                    {loaded ? <Text style={styles.text4}>Password</Text> : ""}
                    <View style={styles.iconTextInput}>
                      <TextInput
                        onChangeText={handleChange("password")}
                        secureTextEntry={hidePassword}
                        placeholder="Enter your password"
                        style={styles.passwordinput}
                      />
                      <TouchableOpacity onPress={toggleHidePassword}>
                        <MaterialIcons
                          name={hidePassword ? "visibility-off" : "visibility"}
                          size={24}
                          color="black"
                          style={styles.toggleButton}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <View>
                        <Text style={styles.errors}>{errors.password}</Text>
                      </View>
                    )}
                    {loaded ? (
                      <Text style={styles.text4}>Confirm Password</Text>
                    ) : (
                      ""
                    )}
                    <View style={styles.iconTextInput}>
                      <TextInput
                        onChangeText={handleChange("confirmpassword")}
                        secureTextEntry={hidePassword}
                        placeholder="Confirm your password"
                        style={styles.passwordinput}
                      />
                      <TouchableOpacity onPress={toggleHidePassword}>
                        <MaterialIcons
                          name={hidePassword ? "visibility-off" : "visibility"}
                          size={24}
                          color="black"
                          style={styles.toggleButton}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.confirmpassword && (
                      <View>
                        <Text style={styles.errors}>
                          {errors.confirmpassword}
                        </Text>
                      </View>
                    )}
                    {loaded ? <Text style={styles.text3}>State</Text> : ""}
                    <SelectList
                      setSelected={(val) => setstatename(val)}
                      data={state}
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
                      setSelected={(val) => setcityname(val)}
                      data={city}
                      boxStyles={styles.input}
                      placeholder=" Select City"
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
                      data={properties}
                      boxStyles={styles.input}
                      placeholder="Select Property"
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
                    {loaded ? (
                      <Text style={styles.text4}>Apartment #</Text>
                    ) : (
                      ""
                    )}
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("apartment")}
                    />
                    <View style={styles.button}>
                      <TouchableOpacity
                        style={styles.getstarted}
                        onPress={handleSubmit}
                      >
                        {loaded ? (
                          <Text style={styles.getstartedtext}>Sign Up</Text>
                        ) : (
                          ""
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
          <View style={{ height: 40 }}></View>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Processing...!"} />}
    </>
  );
}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  logotext: {
    marginTop: 10,
  },
  back: {
    marginLeft: 10,
    marginTop: 35,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 30,
  },
  SignIntext: {
    fontSize: 28,
    fontFamily: "CircularStd",
    marginTop: 30,
    marginLeft: 10,
    letterSpacing: -1,
  },
  text2: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 10,
    left: 16,
  },
  text3: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 30,
    left: 16,
  },
  text4: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 30,
    left: 16,
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
  errors: {
    color: "red",
    marginLeft: "7%",
  },
  passwordinput: {
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
  iconTextInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: -8,
  },
});
