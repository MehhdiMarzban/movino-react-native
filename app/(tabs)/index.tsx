import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useNativeWindColorScheme } from "@/hooks/useNativeWindColorScheme";

export default function HomeScreen() {
    const { toggleColorScheme } = useNativeWindColorScheme();
    return (
        <View className="flex-1 gap-4 bg-background">
            <View className="bg-primary py-4">
                <Text className="text-center text-2xl text-primary-foreground">
                    موینو برنامه ای برای فیلم ها
                </Text>
            </View>
            <View className="px-2">
                <Text className="text-foreground font-peyda-bold text-xl">
                    {" "}
                    سلام مهدی احوال شریف چطوره
                </Text>
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
