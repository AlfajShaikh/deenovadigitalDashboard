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