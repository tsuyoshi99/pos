import axios from "axios";
const instance = axios.create({
  baseURL: "https://pos.hunvikran.com/api",
});
export default instance;
