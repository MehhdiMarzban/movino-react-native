import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useNativeWindColorScheme } from "@/hooks/useNativeWindColorScheme";

export default function HomeScreen() {
    const {toggleColorScheme} = useNativeWindColorScheme();
    return (
        <View className="flex-1 gap-4 bg-background">
            <View className="bg-primary py-4">
                <Text className="text-center text-2xl text-primary-foreground">موینو برنامه ای برای فیلم ها</Text>
            </View>
            <View className="px-2">
                <Text className="text-foreground text-right font-peyda-bold text-xl"> سلام مهدی احوال شریف چطوره</Text>
                <Button variant="default" size="lg" onPress={() => toggleColorScheme()}>
                    <Text>افزودن</Text>
                </Button>
            </View>
        </View>
    );
}
