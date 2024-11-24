import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "tamagui";

const Logo: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.waiter}>WAITER</Text>
            <Text style={styles.app}>APP</Text>
        </View>

    )
};

export default Logo;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "center"
    },
    waiter: {
        fontSize: 30,
        fontWeight: "bold",
    },
    app: {
        fontSize: 30,
        fontWeight: "300",
    }
}
);