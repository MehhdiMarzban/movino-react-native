import { Stack } from "expo-router";
import Providers from "@/components/providers";

export default function RootLayout() {
    return (
        <Providers>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </Providers>
    );
}
