import axios from "axios";

export const callLogin = (email, password) => {
  return axios.post("/login", {
    email,
    password
  });
};

export const callLogout = token => {
  return axios.delete("/logout", { headers: { "x-auth": token } });
};
