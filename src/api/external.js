import axios from "axios";

export const callGoogleBooks = (query, field) => {
  return axios.post("/api", {
    query,
    field
  });
};
