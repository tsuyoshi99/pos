import axios from "axios";
const instance = axios.create({
  // baseURL: "https://pos.hunvikran.com/api",
  baseURL: "http://localhost:7070",
});
export default instance;
