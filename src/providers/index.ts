import axios from 'axios'

export const Api = axios.create({ baseURL: 'http://ec2-34-207-144-68.compute-1.amazonaws.com' })