import API from "../../Service/axios";

export const getDashboardAPI = async () => {
    const response = await API.get("/home");
    return response.data;
};
