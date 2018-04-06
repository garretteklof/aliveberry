import axios from "axios";

const token = localStorage.getItem("token");

export const callPostToBooks = book => {
  return axios.post("/books", book, { headers: { "x-auth": token } });
};

export const callGetBooks = () => {
  return axios.get("/books", { headers: { "x-auth": token } });
};
