import axios from "axios";
import { URL_API } from "../constant";

export const ApiLogin = async (data) => {
  try {
    const response = await axios.post(`${URL_API}/auth/login`, data);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const ApiRegister = async (data) => {
  try {
    const response = await axios.post(
      `${URL_API}/auth/register`,
      data
    );
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};
