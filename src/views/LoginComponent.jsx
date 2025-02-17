import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
function LoginComponent() {
  return (
    <div className="flex">
      <div className="flex-[1] bg-[#f8fafb]  overflow-hidden ">
        <img
          src="https://static-gcp.freepikcompany.com/web-app/media/freepik-6-2000.webp"
          alt="login"
          className=" w-full h-[920px] object-cover pointer-events-none brightness-75"
        />
      </div>
      <div className="py-10 min-w-[450px]  px-[60px] flex flex-col items-center gap-[30px]">
        <img
          src="https://www.freepik.com/v2/assets/freepik-company-gray.8bacab41.svg"
          alt="logo"
          className="w-[150px] h-[22px] object-cover cursor-pointer my-[50px]"
        />
        <h1 className="mb-[32px] text-[20px] font-semibold ">Log in</h1>
        <div className="w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer">
          <FaGoogle className="size-[18px]" />
          <strong>Continue with Google</strong>
        </div>
        <div className="w-full flex items-center gap-[10px] px-[20px] py-[10px] border shadow-[inset_0_0_0_2px_#e3e9ed] border-[#c8c8c8] justify-center cursor-pointer ">
          <FaGithub className="size-[18px]" />
          <strong>Continue with Github</strong>
        </div>
        <div className="flex gap-[5px] pt-[20px] border-t w-full border-[#c8c8c8] justify-center">
          <p className="font-medium">Don’t you have an account?</p>
          <a href="" className="text-[#336AEA] font-bold">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
