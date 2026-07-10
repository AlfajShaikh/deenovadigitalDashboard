import API from "../../../../Service/axios";

// CREATE ESTIMATE
export const createEstimateAPI = async (data) => {
    const response = await API.post("/estimate/addestimate", data);
    return response.data;
};

// GET ESTIMATE BY REQUIREMENT ID
export const getEstimateByRequirementIdAPI = async (requirementId) => {
    const response = await API.get(`/estimate/${requirementId}`);
    return response.data;
};