import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "^/env";

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
