import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

instance
  .get("/api/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

const API_URL = "/api/users/";
//registerUser
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
};

export default authService;
