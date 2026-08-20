import API from "../../../Service/axios";


export const createStaffAPI = async (staffData) => {
  try {
    const response = await API.post("/users", staffData);
    return response.data;
  } catch (err) {
    console.log(err.response.data);   // <--- important
    throw err;
  }
};

export const getAllStaffAPI = async () => {
  const response = await API.get("/users");
  return response.data;
};


export const getStaffByIdAPI = async (staffId) => {
  const response = await API.get(`/users/staff/${staffId}`);
  return response.data;
};

export const updateStaffAPI = async (staffId, staffData) => {
  const response = await API.put(
    `/users/staff/${staffId}`,
    staffData
  );
  return response.data;
};

export const deleteStaffAPI = async (staffId) => {
  const response = await API.delete(
    `/users/staff/${staffId}`
  );
  return response.data;
};


// VERIFY OTP
export const verifyOtpAPI = async (data) => {
  const response = await API.post(
    "/users/verify-otp",
    data
  );

  return response.data;
};

// RESEND OTP
export const resendOtpAPI = async (email) => {
  const response = await API.post(
    "/users/resend-otp",
    { email }
  );

  return response.data;
};