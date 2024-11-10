export default ({ config }) => ({
  ...config,
  name: "Starter Base",
  slug: "starter-base",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  extra: {
    MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSContactsUsageDescription:
        "Цей додаток використовує контакти для відображення контактів з прізвищем, що закінчується на 'ко'.",
      NSLocationWhenInUseUsageDescription: "This app needs access to your location to show your position on the map.",
    },
    bundleIdentifier: "com.iqura.starterbase",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.iqura.starterbase",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsDownloadToken: process.env.EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
