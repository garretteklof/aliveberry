import axios from "axios";

export const callPostBooks = book => {
  const token = localStorage.getItem("token");
  return axios.post("/books", book, { headers: { "x-auth": token } });
};
