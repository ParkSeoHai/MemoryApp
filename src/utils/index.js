import { toast } from "vue3-toastify";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json"
  }
});

// Thêm interceptor để tự động gắn token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const handleErrorAPI = (error, toastId) => {
  console.log(error);
  if (error?.response?.data?.errors) {
    error.response.data.errors?.forEach((error) => {
      if (toastId) {
        toast.update(toastId, {
          render: error?.message || "Có lỗi xảy ra",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.error(error?.message || "Có lỗi xảy ra");
      }
    });
  } else {
    if (toastId) {
      toast.update(toastId, {
        render: error?.response?.data?.message || error?.message || "Có lỗi xảy ra",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.error(error?.response?.data?.message || error?.message || "Có lỗi xảy ra");
    }
  }
  if (error?.status === 401 || error?.status === 403) {
    setTimeout(() => {
      // delete token
      localStorage.clear();
      location.href = "/login";
    }, 2000);
  }
  return null;
};

export function fileToBase64(file, includeMime = false) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("File không hợp lệ"));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result;
      if (includeMime) {
        resolve(base64String); // Giữ nguyên cả MIME type
      } else {
        resolve(base64String.split(",")[1]); // Chỉ lấy phần base64
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

export default api;