import API from "../../../../Service/axios";

export const createRequirementEnquiryAPI = async (data) => {
  const response = await API.post("/requirmentenquiry", data);
  return response.data;
};

export const getAllRequirementEnquiryAPI = async () => {
  const response = await API.get("/requirmentenquiry");
  return response.data;
};


// UPDATE
export const updateRequirementEnquiryAPI = async (
  requirementId,
  data
) => {
  const response = await API.put(
    `/requirmentenquiry/${requirementId}`,
    data
  );
  return response.data;
};

// DELETE
export const deleteRequirementEnquiryAPI = async (
  requirementId
) => {
  const response = await API.delete(
    `/requirmentenquiry/${requirementId}`
  );
  return response.data;
};



// CREATE
export const createNoteAPI = async (data) => {
  const response = await API.post("/notes/addnote", data);
  return response.data;
};

// GET ALL
export const getAllNotesAPI = async () => {
  const response = await API.get("/notes");
  return response.data;
};

// UPDATE
export const updateNoteAPI = async (noteId, data) => {
  const response = await API.put(`/notes/${noteId}`, data);
  return response.data;
};

// DELETE
export const deleteNoteAPI = async (noteId) => {
  const response = await API.delete(`/notes/${noteId}`);
  return response.data;
};