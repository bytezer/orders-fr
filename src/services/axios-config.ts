import axios from "axios";

const api = axios.create({
  baseURL: "https://api-production-211f.up.railway.app",
});

export default api;
