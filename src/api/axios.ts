import axios from "axios";

const baseURL = import.meta.env.BACKEND_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
