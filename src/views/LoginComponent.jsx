import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { ApiLogin } from "../service/auth";
import { toast, ToastContainer } from "react-toastify";

function LoginComponent() {
  const handleLoginByGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const formatResult = result.user.providerData[0];
      const response = await ApiLogin(formatResult);

      if (response?.status === 404) {
        toast.error(
          "Đăng nhập không thành công, tài khoản không tồn tại trong hệ thống"
        );
      } else if (response?.status === 200) {
        toast.success("Đăng nhập tài khoản thành công");
      }
      // Bạn có thể xử lý thêm phản hồi từ API ở đây nếu cần
    } catch (error) {
      toast.error("Đã xảy ra lỗi từ phía máy chủ, vui lòng thử lại sau.");
    }
  };

  const handleLoginByGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const formatResult = result.user.providerData[0];

      const response = await ApiLogin(formatResult);

      if (response?.status === 404) {
        toast.error(
          "Đăng nhập không thành công, tài khoản không tồn tại trong hệ thống"
        );
      } else if (response?.status === 200) {
        toast.success("Đăng nhập tài khoản thành công");
      }
      // Bạn có thể xử lý thêm phản hồi từ API ở đây nếu cần
    } catch (error) {
      toast.error(
        "Email của tài khoản này, đã được sử dụng cho một phương thức đăng nhập khắc, vui lòng thử lại sau"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://static-gcp.freepikcompany.com/web-app/media/freepik-6-2000.webp"
          alt="login"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-[450px] px-8 py-12 flex flex-col items-center">
          {/* Logo */}
          <img
            src="https://www.freepik.com/v2/assets/freepik.8bacab41.svg"
            alt="logo"
            className="w-[150px] h-auto mb-12 cursor-pointer"
          />

          {/* Login Header */}
          <h1 className="text-2xl font-semibold mb-8">Log in</h1>

          {/* Social Login Buttons */}
          <div className="w-full space-y-4">
            <button
              onClick={handleLoginByGoogle}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FaGoogle className="text-xl" />
              <span className="font-semibold">Continue with Google</span>
            </button>

            <button
              onClick={handleLoginByGithub}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FaGithub className="text-xl" />
              <span className="font-semibold">Continue with Github</span>
            </button>
          </div>

          {/* Sign up Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 w-full text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default LoginComponent;
