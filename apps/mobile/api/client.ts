import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
});

export function authWithBearer(token: string) {
	return { headers: { Authorization: `Bearer ${token}` } };
}
