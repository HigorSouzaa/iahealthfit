import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../Config/Firebase/fb"; // Importando a configuração do Firestore
import { doc, setDoc } from "firebase/firestore";

export default function Cadastro() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ BreeSerif_400Regular });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  if (!fontsLoaded) {
    return null; // Adicione um componente de carregamento se necessário
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      // Adicionando usuário ao Firestore com o email como ID do documento
      await setDoc(doc(db, "usuarios", email), {
        Email: email,
        Senha: password, // Em um ambiente de produção, não é recomendado armazenar senhas em texto claro
      });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      // navigation.navigate("Cadastro2", { email: email });
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.conteiner}>
        <View style={styles.footer}>
          <Text style={styles.txt_footer}>Cadastro</Text>
        </View>
        <Image
          source={require("../../../assets/imgLogoHome.png")}
          style={{ width: 340, marginTop: 50 }}
          resizeMode="contain"
        />

        <View style={styles.conteinerInputs}>
          <Text style={styles.txtInputs}>Email:</Text>
          <View style={styles.Inputs}>
            <Image
              source={require("../../../assets/emailImg.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              fontSize={22}
              placeholder="seu@email.com"
              placeholderTextColor={"#E6E3F6"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.conteinerInput}>
          <Text style={styles.txtInputs}>Senha:</Text>
          <View style={styles.Inputs}>
            <Image
              source={require("../../../assets/senhaImg.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input2}
              fontSize={22}
              placeholder="**********"
              placeholderTextColor={"#E6E3F6"}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={
                  passwordVisible
                    ? require("../../../assets/olhoFechado.png")
                    : require("../../../assets/olhoAberto.png")
                }
                resizeMode="contain"
                style={{ width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.conteinerInput}>
          <Text style={styles.txtInputs}>Repita a Senha:</Text>
          <View style={styles.Inputs}>
            <Image
              source={require("../../../assets/senhaImg.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input2}
              fontSize={22}
              placeholder="**********"
              placeholderTextColor={"#E6E3F6"}
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Image
                source={
                  confirmPasswordVisible
                    ? require("../../../assets/olhoFechado.png")
                    : require("../../../assets/olhoAberto.png")
                }
                resizeMode="contain"
                style={{ width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.conteiner_restaurarSenha}>
          <Text style={styles.text_recuperarSenha}>Já tem conta faça </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.highlight}>login?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btEntrar} onPress={handleSignUp}>
          <View>
            <Text style={styles.txt_btEntrar}>Cadastre-se</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  conteinerInputs: {
    width: "80%",
    marginTop: 20,
  },
  conteinerInput: {
    marginTop: 10,
    width: "80%",
  },
  Inputs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  input: {
    marginLeft: 10,
    color: "#CAC1F9",
    display: "flex",
    justifyContent: "center",
    width: "85%",
  },
  input2: {
    marginLeft: 10,
    color: "#CAC1F9",
    display: "flex",
    justifyContent: "center",
    width: "75%",
  },
  txtInputs: {
    marginBottom: 3,
    fontSize: 40,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
    //Sombra IOS
    shadowColor: "#0003",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 1,
  },
  conteiner_restaurarSenha: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 15,
    marginTop: 8,
  },
  highlight: {
    color: "#A397E3",
    fontFamily: "BreeSerif_400Regular",
    fontSize: 16,
  },
  text_recuperarSenha: {
    color: "#CAC1F9",
    fontFamily: "BreeSerif_400Regular",
    fontSize: 16,
  },
  btEntrar: {
    marginTop: 50,
    backgroundColor: "#CAC1F9",
    width: "70%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    //Sombra IOS
    shadowColor: "#0003",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 1,
  },
  txt_btEntrar: {
    fontSize: 40,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAC1F9",
    width: "98%",
    height: 160,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  txt_footer: {
    fontSize: 60,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
    letterSpacing: 3,
    top: 10,
  },
});
