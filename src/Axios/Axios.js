import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 50000,
});

export default Axios;
