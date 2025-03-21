import { I18nManager } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";

import "@/styles/global.css";
import useThemeManager from "@/hooks/useThemeManager";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//* change direction to RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

/**
 * A wrapper component that wraps the root of the app with the necessary
 * providers (e.g. theme provider, navigation provider, etc.).
 *
 * It also handles the font loading and color scheme loading.
 *
 * @param children The children components to be rendered.
 * @returns The wrapped children components with the necessary providers.
 */
const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isDarkColorScheme, isThemeLoaded, theme } = useThemeManager();
    const [loaded] = useFonts({
        "peyda-medium": require("../../assets/fonts/Peyda-Medium.ttf"),
        "peyda-thin": require("../../assets/fonts/Peyda-Thin.ttf"),
        "peyda-bold": require("../../assets/fonts/Peyda-Bold.ttf"),
    });

    //* font loaded
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded || !isThemeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={theme}>
            <SafeAreaProvider>
                <SafeAreaView className="flex-1 bg-background">
                    {children}
                    <StatusBar
                        backgroundColor={
                            theme.colors.primary
                        }
                        style={isDarkColorScheme ? "light" : "dark"}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

export default Providers;
