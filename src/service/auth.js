import axios from "axios";

export const ApiLogin = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", data);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const ApiRegister = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};
