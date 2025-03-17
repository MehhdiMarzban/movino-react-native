import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import "@/global.css";
import { useNativeWindColorScheme } from "@/hooks/useNativeWindColorScheme";
import { NAV_THEME } from "@/constants/ThemeColors";

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { colorScheme, isDarkColorScheme } = useNativeWindColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const hasMounted = useRef(false);
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    //* color scheme loaded
    useEffect(() => {
        if (hasMounted.current) {
            return;
        }
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    //* font loaded
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded || !isColorSchemeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <SafeAreaProvider>
                <SafeAreaView className="flex-1">
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
