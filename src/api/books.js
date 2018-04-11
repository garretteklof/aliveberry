import axios from "axios";

const token = localStorage.getItem("token");

export const callGetBooks = token => {
  return axios.get("/books", { headers: { "x-auth": token } });
};

export const callPostToBooks = book => {
  return axios.post("/books", book, { headers: { "x-auth": token } });
};

export const callPatchToBooks = ({ _id, shelfStatus }) => {
  return axios.patch(
    `/books/${_id}`,
    { shelfStatus },
    {
      headers: { "x-auth": token }
    }
  );
};

export const callDeleteFromBooks = ({ _id }) => {
  return axios.delete(`/books/${_id}`, { headers: { "x-auth": token } });
};
