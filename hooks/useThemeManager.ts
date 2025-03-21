import { useEffect, useState } from "react";
import { useNativeWindColorScheme } from "./useNativeWindColorScheme";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { NAV_THEME } from "@/constants/ThemeColors";
import * as NavigationBar from "expo-navigation-bar";
import { storage } from "@/lib/storage";

//* theme storage key
const THEME_STORAGE_KEY = "app_theme_preference";

//* Define theme objects
const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

//* theme manager hook result type
interface ThemeManagerResult {
    theme: typeof LIGHT_THEME | typeof DARK_THEME;
    isThemeLoaded: boolean;
    isDarkColorScheme: boolean;
    toggleColorScheme: () => void;
}

const useThemeManager = (): ThemeManagerResult => {
    const { isDarkColorScheme, setColorScheme, toggleColorScheme } = useNativeWindColorScheme();
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

    //* initialize app storage
    const themeStorage = storage(THEME_STORAGE_KEY, "light");

    //* load theme from storage
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await themeStorage.get();
                if (savedTheme !== null) {
                    const isDark = savedTheme === "dark";
                    setColorScheme(isDark ? "dark" : "light");
                }
                setIsThemeLoaded(true);
            } catch (err) {
                console.log("can not load theme form storage", err);
                setIsThemeLoaded(true);
            }
        };

        loadTheme();
    }, []);

    //* save theme to storage
    useEffect(() => {
        if (isThemeLoaded) {
            const saveTheme = async () => {
                try {
                    await themeStorage.set(isDarkColorScheme ? "dark" : "light");
                } catch (err) {
                    console.log("can not save theme to storage", err);
                }
            };

            saveTheme();
        }
    }, [isDarkColorScheme]);

    //* Update navigation bar color when theme changes
    useEffect(() => {
        if (isThemeLoaded) {
            NavigationBar.setBackgroundColorAsync(
                isDarkColorScheme ? DARK_THEME.colors.background : LIGHT_THEME.colors.background
            );
        }
    }, [isDarkColorScheme, isThemeLoaded]);

    return {
        theme: isDarkColorScheme ? DARK_THEME : LIGHT_THEME,
        isThemeLoaded,
        toggleColorScheme,
        isDarkColorScheme,
    };
};

export default useThemeManager;
