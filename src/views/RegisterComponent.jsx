import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { ApiRegister } from "../service/auth";
import { toast, ToastContainer } from "react-toastify";

function RegisterComponent() {
  const handleRegisterByGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const formatResult = result.user.providerData[0];

      const response = await ApiRegister(formatResult);

      if (response?.status === 409) {
        toast.error("Tài khoản đã tồn tại trong hệ thống");
      } else if (response?.status === 201) {
        toast.success("Đăng ký tài khoản thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi từ phía máy chủ, vui lòng thử lại sau.");
    }
  };

  const handleRegisterByGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const formatResult = result.user.providerData[0];

      const response = await ApiRegister(formatResult);

      if (response?.status === 409) {
        toast.error("Tài khoản đã tồn tại trong hệ thống");
      } else if (response?.status === 201) {
        toast.success("Đăng ký tài khoản thành công");
      }
    } catch (error) {
      toast.error(
        "Email của tài khoản này đã được sử dụng cho một phương thức đăng nhập khác"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://static-gcp.freepikcompany.com/web-app/media/freepik-6-2000.webp"
          alt="register"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-[450px] px-8 py-12 flex flex-col items-center">
          {/* Logo */}
          <img
            src="https://www.freepik.com/v2/assets/freepik.8bacab41.svg"
            alt="logo"
            className="w-[150px] h-auto mb-12 cursor-pointer"
          />

          {/* Register Header */}
          <h1 className="text-2xl font-semibold mb-4">Create an Account</h1>
          <p className="text-gray-600 mb-8 text-center">
            Join our community and discover amazing resources
          </p>

          {/* Social Register Buttons */}
          <div className="w-full space-y-4">
            <button
              onClick={handleRegisterByGoogle}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
              <FaGoogle className="text-xl  group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Sign up with Google</span>
            </button>

            <button
              onClick={handleRegisterByGithub}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
              <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Sign up with Github</span>
            </button>
          </div>

          {/* Terms and Privacy */}
          <p className="mt-8 text-sm text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 w-full text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700">
                Log in
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

export default RegisterComponent;
