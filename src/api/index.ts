import axios, { AxiosInstance } from "axios";

const API:AxiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "json",
    },
});

export default API;

//   useEffect((
//     async function getUsers() {
//       const res:AxiosResponse= await API.get("/users")
//       console.log(res);
//     }
//     getUsers();
//   ), [])
