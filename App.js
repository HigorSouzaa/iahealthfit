import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./src/Telas/Main/main";
import Cadastro from "./src/Telas/Cadastro/cadastro";
import Login from "./src/Telas/Login/login";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#E6E3F5" },
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyStack></MyStack>;
}
