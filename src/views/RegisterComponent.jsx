import { ToastContainer, toast } from "react-toastify";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ApiRegister } from "../service/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
function Register() {
  const [clause, setClause] = useState(false);
  const handleRegisterByGoogle = async () => {
    try {
      if (clause) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const formatResult = result.user.providerData[0];
        const response = await ApiRegister(formatResult);

        if (response?.status === 500) {
          toast.error(
            "Tài khoản đã tồn tại trong hệ thống, vui lòng kiểm tra lại"
          );
        } else if (response?.status === 200) {
          toast.success("Đăng ký tài khoản thành công");
        }
        // Bạn có thể xử lý thêm phản hồi từ API ở đây nếu cần
      } else {
        toast.warn(
          "Để đăng ký tài khoản bạn vui lòng xác nhận rằng, bạn đồng ý với các điều khoản của chúng tôi."
        );
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập hoặc lỗi API
      toast.error(
        "Email đăng ký đã được sử dụng cho một tài khoản khác trong hệ thống, vui lòng kiểm tra lại."
      );
    }
  };

  const handleRegisterByGithub = async () => {
    try {
      if (clause) {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const formatResult = result.user.providerData[0];
        const response = await ApiRegister(formatResult);

        if (response?.status === 500) {
          toast.error(
            "Email đã được đăng ký cho một phương thức đăng nhập khác, vui lòng kiểm tra lại"
          );
        } else if (response?.status === 200) {
          toast.success("Đăng ký tài khoản thành công");
        }
        // Bạn có thể xử lý thêm phản hồi từ API ở đây nếu cần
      } else {
        toast.warn(
          "Để đăng ký tài khoản bạn vui lòng xác nhận rằng, bạn đồng ý với các điều khoản của chúng tôi."
        );
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập hoặc lỗi API
      toast.error(
        "Email đăng ký đã được sử dụng cho một tài khoản khác trong hệ thống, vui lòng kiểm tra lại."
      );
    }
  };

  const handleOnChangeClause = () => {
    setClause((prev) => !prev);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-[1] bg-[#f8fafb]  overflow-hidden ">
          <img
            src="https://static-gcp.freepikcompany.com/web-app/media/freepik-6-2000.webp"
            alt="login"
            className=" w-full h-[920px] object-cover pointer-events-none brightness-75"
          />
        </div>
        <div className="py-10 min-w-[350px] max-w-[450px] px-[60px] flex flex-col items-center gap-[30px]">
          <img
            src="https://www.freepik.com/v2/assets/freepik.8bacab41.svg"
            alt="logo"
            className="w-[150px] h-[22px] object-cover cursor-pointer my-[50px]"
          />
          <h1 className="mb-[32px] text-[20px] font-semibold ">
            Create an account
          </h1>
          <div
            onClick={handleRegisterByGoogle}
            className=" w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer">
            <FaGoogle className="size-[18px]" />
            <strong>Continue with Google</strong>
          </div>
          <div
            onClick={handleRegisterByGithub}
            className="w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer ">
            <FaGithub className="size-[18px]" />
            <strong>Continue with Github</strong>
          </div>
          <div className="flex gap-[10px] w-full">
            <input
              type="checkbox"
              className="w-[33px] h-[33px] text-center cursor-pointer"
              checked={clause}
              onChange={handleOnChangeClause}
            />
            <strong className="text-[#5B5B5B] font-normal ">
              By continuing, you agree to Freepik Terms of Use and Privacy
              Policy.
            </strong>
          </div>
          <div className="flex gap-[5px] pt-[20px] border-t w-full border-[#c8c8c8] justify-center">
            <p className="font-medium">Already have an account?</p>
            <a href="/login" className="text-[#336AEA] font-bold">
              Login
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
export default Register;
