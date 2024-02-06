import axios from "axios";

const instance = axios.create({
    baseURL: "https://143.198.246.67/api",
    withCredentials: true
})

export default instance
