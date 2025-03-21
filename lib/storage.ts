import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * A convenience wrapper for AsyncStorage that provides a type-safe get and set
 * method and returns a default value if the key is not set.
 *
 * @param key The key to use for AsyncStorage.
 * @param defaultValue The default value to return if key is not set.
 * @returns An object with a `set` and a `get` method.
 *   - `set(value)`: Sets the value for the given key.
 *   - `get()`: Retrieves the value for the given key. If the key is not set,
 *     returns the defaultValue.
 */
export const storage = <T>(key: string, defaultValue: T) => {
    return {
        set: async (value: T) => {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        get: async () => {
            const item = await AsyncStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        },
    };
};
