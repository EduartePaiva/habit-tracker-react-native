import { Account, Client } from "react-native-appwrite";

const project_id = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const platform = process.env.EXPO_PUBLID_APPWRITE_PLATFORM!;

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(project_id)
  .setPlatform(platform);

export const account = new Account(client);
