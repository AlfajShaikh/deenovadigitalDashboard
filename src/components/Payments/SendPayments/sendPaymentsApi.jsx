import API from "../../../Service/axios";

export const getStaffListAPI = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const addPaymentAPI = async (paymentData) => {
  const response = await API.post(
    "/payments/addpayments",
    [paymentData]   // Your API expects an array
  );

  return response.data;
};


export const getPaymentHistoryAPI = async () => {
  const response = await API.get("/payments");
  return response.data;
};

export const updatePaymentStatusAPI = async (staffId, status) => {
  const response = await API.put(
    `/payments/staff/${staffId}`,
    {
      status,
    }
  );

  return response.data;
};

export const getPaymentHistoryByStaffAPI = async (staffId) => {
  const response = await API.get(`/payments/staff/${staffId}`);
  return response.data;
};

export const updatePaymentAPI = async (staffId, paymentData) => {
  const response = await API.put(
    `/payments/staff/${staffId}`,
    paymentData
  );

  return response.data;
};


