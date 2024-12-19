import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Main() {
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      <Image
        source={require("../../../assets/imgLogoHome.png")}
        style={{ width: 340, marginTop: 90 }}
        resizeMode="contain"
      ></Image>
      <Image
        source={require("../../../assets/LogoCentro.png")}
        style={{ marginTop: 90 }}
        resizeMode="contain"
      ></Image>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          source={require("../../../assets/BtJaTenhoConta.png")}
          style={{ width: 305, marginTop: 25 }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Image
          source={require("../../../assets/BtNaoTenhoConta.png")}
          style={{ width: 305, marginTop: 40 }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
