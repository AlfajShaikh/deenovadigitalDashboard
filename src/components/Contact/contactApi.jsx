import API from "../../Service/axios";

// CREATE
export const createContactAPI = async (data) => {
  const response = await API.post("/contact/addcontact", data);
  return response.data;
};

// GET ALL
export const getAllContactAPI = async () => {
  const response = await API.get("/contact");
  return response.data;
};

// UPDATE
export const updateContactAPI = async (contactId, data) => {
  const response = await API.put(`/contact/${contactId}`, data);
  return response.data;
};

// DELETE
export const deleteContactAPI = async (contactId) => {
  const response = await API.delete(`/contact/${contactId}`);
  return response.data;
};