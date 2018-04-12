import axios from "axios";

export const callGetBooks = () => {
  const token = localStorage.getItem("token");
  return axios.get("/books", { headers: { "x-auth": token } });
};

export const callPostToBooks = book => {
  const token = localStorage.getItem("token");
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
