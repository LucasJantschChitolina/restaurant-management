import AppButton from "@/components/AppButton";
import Logo from "@/components/Logo";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, SizableText, View } from "tamagui";
import { useSession } from "./context";

export default function Login() {
    const { signIn } = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        signIn(email, password);
    };

    return (
        <View gap="$2" flex={1} alignItems="center" justifyContent="center">
            <SizableText size="$3" >Bem-vindo(a) ao</SizableText >
            <Logo />
            <View gap="$2" width={360} padding="$1">
                <Input placeholder="E-mail" onChangeText={setEmail} value={email} />
                <Input
                    placeholder="Password" onChangeText={setPassword} value={password}
                    secureTextEntry
                />
                <AppButton title="Login" onPress={handleLogin}>Login</AppButton>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});