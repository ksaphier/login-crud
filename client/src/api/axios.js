import axios from "axios";

const instance = axios.create({
    baseURL: "http://143.198.246.67/api",
    withCredentials: true
})

export default instance
