import { Stack } from "expo-router";
import Providers from "@/components/providers";

export default function RootLayout() {
    return (
        <Providers>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
            </Stack>
        </Providers>
    );
}
