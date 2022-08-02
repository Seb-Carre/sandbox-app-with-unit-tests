import axios from "axios";
import { useRef, useState } from "react";
import { Button, Text, TextInput } from "react-native";

import { View } from "../components/Themed";

export default function LoginScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(
    "Your username or password is incorrect"
  );
  const allowText = true;
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {allowText && <Text>Hello</Text>}
      <TextInput
        style={{ padding: 10 }}
        placeholder="Username"
        testID="Login.username"
        onChangeText={(text) => {
          usernameRef.current = text;
        }}
      ></TextInput>
      <TextInput
        style={{ padding: 10 }}
        placeholder="Password"
        testID="Login.password"
        onChangeText={(text) => {
          passwordRef.current = text;
        }}
      ></TextInput>
      <Button
        title="OK"
        testID="Login.Button"
        onPress={async () => {
          if (!passwordRef.current || !usernameRef.current) {
            setErrorMessage("Your username or password is incorrect");
          } else {
            const result = await axios.get(
              "https://jsonplaceholder.typicode.com/users/1"
            );
            if (result.data.name === "Leanne Graham") {
              navigation.navigate("NotFound");
            } else {
              navigation.navigate("NotFound");
            }
          }
        }}
      ></Button>

      {errorMessage !== "" && (
        <Text testID="Login.errorMessage">{errorMessage}</Text>
      )}
    </View>
  );
}
