import * as SecureStorage from "expo-secure-store";

const ACCESS_TOKEN = "ACCESS_TOKEN_STORAGE";
const REFRESH_TOKEN = "REFRESH_TOKEN_STORAGE";
export const saveToken = async (accessToken: string, refreshToken: string) => {
    await SecureStorage.setItemAsync(ACCESS_TOKEN, accessToken);
    await SecureStorage.setItemAsync(REFRESH_TOKEN, refreshToken);
};

//* get access token from secure storage
export const getAccessToken = async () => {
    return SecureStorage.getItemAsync(ACCESS_TOKEN);
};

//* get refresh token from secure storage
export const getRefreshToken = async () => {
    return SecureStorage.getItemAsync(REFRESH_TOKEN);
};

//* get all tokens from secure storage
export const getAllTokens = async () => {
    return {
        accessToken: await getAccessToken(),
        refreshToken: await getRefreshToken(),
    };
};

//* delete all tokens from secure storage
export const deleteAllTokens = async () => {
    await SecureStorage.deleteItemAsync(ACCESS_TOKEN);
    await SecureStorage.deleteItemAsync(REFRESH_TOKEN);
};
