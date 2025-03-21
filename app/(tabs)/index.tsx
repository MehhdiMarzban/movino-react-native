import { View } from "react-native";

import { useNativeWindColorScheme } from "@/hooks/useNativeWindColorScheme";
import { ThemeToggle, Button, Text } from "@/components/ui";

export default function HomeScreen() {
    const { toggleColorScheme } = useNativeWindColorScheme();
    return (
        <View className="flex-1 gap-4 bg-background">
            <View className="flex flex-row justify-between bg-primary p-4">
                <Text className="text-center text-2xl text-primary-foreground">
                    موینو برنامه ای برای فیلم ها
                </Text>
                <ThemeToggle />
            </View>
            <View className="px-2 gap-4">
                <Text className="text-foreground font-peyda-bold text-xl"> موش بخورت</Text>
                <View className="flex flex-row gap-2">
                    <Button
                        className="flex-1"
                        variant="default"
                        size="lg"
                        onPress={() => toggleColorScheme()}>
                        <Text>تم</Text>
                    </Button>
                    <Button className="flex-1" variant="secondary" size="lg">
                        <Text>برگشت</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
