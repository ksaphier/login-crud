import axios from "axios";

const instance = axios.create({
    baseURL: "https://159.223.196.180/api",
    withCredentials: true
})

export default instance
