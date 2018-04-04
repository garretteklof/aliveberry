import axios from "axios";

export const callAddUser = (email, password) => {
  return axios.post("/users", { email, password });
};
