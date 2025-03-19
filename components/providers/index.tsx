import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

import "@/styles/global.css";
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
    const { isDarkColorScheme } = useNativeWindColorScheme();
    const [loaded] = useFonts({
        "peyda-medium": require("../../assets/fonts/Peyda-Medium.ttf"),
        "peyda-thin": require("../../assets/fonts/Peyda-Thin.ttf"),
        "peyda-bold": require("../../assets/fonts/Peyda-Bold.ttf"),
    });

    const hasMounted = useRef(false);
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    //* change navigation bar color
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(
            isDarkColorScheme ? DARK_THEME.colors.background : LIGHT_THEME.colors.background
        );
    }, [isDarkColorScheme]);

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
                <SafeAreaView className="flex-1 bg-background">
                    {children}
                    <StatusBar
                        backgroundColor={
                            isDarkColorScheme
                                ? DARK_THEME.colors.primary
                                : LIGHT_THEME.colors.primary
                        }
                        style={isDarkColorScheme ? "light" : "dark"}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

export default Providers;
