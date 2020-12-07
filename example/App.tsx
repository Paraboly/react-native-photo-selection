import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import PhotoSelection from "./lib/PhotoSelection";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      >
        <Text>Hello</Text>
        <PhotoSelection />
      </SafeAreaView>
    </>
  );
};

export default App;
