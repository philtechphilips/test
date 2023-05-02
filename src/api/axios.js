import axios from "axios";

export default axios.create({
    baseURL: "https://todo-vu44.onrender.com",
    withCredentials: false,
   
})