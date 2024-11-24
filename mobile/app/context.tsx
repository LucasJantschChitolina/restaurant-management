import React from "react";
import { useStorageState } from "./useStorageState";
import { router } from "expo-router";

const AuthContext = React.createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (email: string, password: string) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useSession must be wrapped in a <SessionProvider />");
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    return (
        <AuthContext.Provider
            value={{
                signIn: async (email, password) => {
                    console.log('signing in', email, password);
                    try {
                        const loginResponse = await fetch("http://localhost:4000/sign-in", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password }),
                        });

                        if (loginResponse.status !== 200) {
                            console.error('Login failed with status:', loginResponse.status);
                            return;
                        }

                        const jsonResponse = await loginResponse.json();

                        setSession(jsonResponse.token);
                        router.push("/");

                    } catch (error) {
                        console.error('Error during sign-in:', error);
                    }
                },
                signOut: () => {
                    setSession(null);
                    router.push("/login");
                },
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}