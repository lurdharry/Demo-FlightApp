import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: config.name ?? "my-app",
  slug: config.slug ?? "my-app",
  ...config,
  extra: {
    apiUrl: process.env.BASE_URL ?? "",
    apiKey: process.env.RAPID_API_KEY ?? "",
    apiHost: process.env.RAPID_API_HOST ?? "",
  },
});
