import axios from "axios";

export const Api = axios.create({
  baseURL: "http://ec2-3-91-151-191.compute-1.amazonaws.com:8080",
});
