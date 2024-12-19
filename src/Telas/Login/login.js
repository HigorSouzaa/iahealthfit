import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../Config/Firebase/fb"; // Importando a configuração do Firestore
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Login() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ BreeSerif_400Regular });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setIsLoading(true); // Inicia o carregamento
    try {
      const q = query(collection(db, "usuarios"), where("Email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Email não encontrado.");
        setIsLoading(false); // Finaliza o carregamento
        return;
      }

      let user = null;
      querySnapshot.forEach((doc) => {
        user = { id: doc.id, ...doc.data() }; // Captura o objeto do cliente com ID
      });

      if (user.Senha !== password) {
        Alert.alert("Erro", "Senha incorreta.");
        setIsLoading(false); // Finaliza o carregamento
      } else {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        setIsLoading(false); // Finaliza o carregamento
        // navigation.navigate("Home", { userData: user }); // Passa o objeto completo para a Home
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  if (isLoading) {
    // Exibe uma tela de carregamento enquanto o estado `isLoading` é true
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.conteiner}>
        <Image
          source={require("../../../assets/imgLogoHome.png")}
          style={{ width: 340, marginTop: 140 }}
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
        <View style={styles.conteiner_restaurarSenha}>
          <Text style={styles.text_recuperarSenha}>recuperar a senha </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("InsiraEmail");
            }}
          >
            <Text style={styles.highlight}>clique aqui!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btEntrar} onPress={handleLogin}>
          <View>
            <Text style={styles.txt_btEntrar}>Entrar</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.txt_footer}>Login</Text>
        </View>
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#000",
  },
  conteinerInputs: {
    width: "80%",
    marginTop: 40,
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
    height: 230,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    top: 100,
  },

  txt_footer: {
    fontSize: 60,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
    bottom: 56,
    letterSpacing: 3,
  },
});
