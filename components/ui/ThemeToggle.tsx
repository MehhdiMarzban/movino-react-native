import { Pressable, View } from "react-native";

import { MoonStar, Sun } from "@/components/icons";
import { cn } from "@/lib/utils";
import useThemeManager from "@/hooks/useThemeManager";

export function ThemeToggle() {
    const { toggleColorScheme, isDarkColorScheme } = useThemeManager();

    return (
        <Pressable
            onPress={toggleColorScheme}
            className="transition-all ease duration-100">
            {({ pressed }) => (
                <View
                    className={cn(
                        "flex-1 aspect-square justify-center items-start",
                        pressed && "opacity-70"
                    )}>
                    {isDarkColorScheme ? (
                        <MoonStar className="text-foreground" size={30} strokeWidth={1.5} />
                    ) : (
                        <Sun className="text-foreground" size={30} strokeWidth={1.5} />
                    )}
                </View>
            )}
        </Pressable>
    );
}
