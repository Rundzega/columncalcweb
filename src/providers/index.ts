import axios from 'axios'

export const Api = axios.create({ baseURL: "http://ec2-52-23-172-186.compute-1.amazonaws.com:8080" })