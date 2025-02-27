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
    <>
      <div className="flex">
        <div className="flex-[1] bg-[#f8fafb] overflow-hidden">
          <img
            src="https://static-gcp.freepikcompany.com/web-app/media/freepik-6-2000.webp"
            alt="login"
            className=" w-full h-[920px] object-cover pointer-events-none brightness-75"
          />
        </div>
        <div className="py-10 min-w-[450px]  px-[60px] flex flex-col items-center gap-[30px]">
          <img
            src="https://www.freepik.com/v2/assets/freepik.8bacab41.svg"
            alt="logo"
            className="w-[150px] h-[22px] object-cover cursor-pointer my-[50px]"
          />
          <h1 className="mb-[32px] text-[20px] font-semibold ">Log in</h1>
          <div
            onClick={handleLoginByGoogle}
            className="w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer">
            <FaGoogle className="size-[18px]" />
            <strong>Continue with Google</strong>
          </div>
          <div
            onClick={handleLoginByGithub}
            className="w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer ">
            <FaGithub className="size-[18px]" />
            <strong>Continue with Github</strong>
          </div>
          <div className="flex gap-[5px] pt-[20px] border-t w-full border-[#c8c8c8] justify-center">
            <p className="font-medium">Don’t you have an account?</p>
            <a href="/register" className="text-[#336AEA] font-bold">
              Sign up
            </a>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default LoginComponent;
