import { Client } from "react-native-appwrite";

const project_id = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const project_name = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(endpoint).setProject(project_id).setPlatform();
