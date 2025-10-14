<script setup>
import { ref, onMounted } from "vue";
import { fileToBase64 } from "../utils";
import UserNavbar from "../components/UserNavbar.vue";
import { URL_API } from "../constant";
import api from "../utils";
import { toast } from "vue3-toastify";
import { handleErrorAPI } from "../utils";

const loading = ref(false);

const realName = ref("");
const profilePhoto = ref("");
const email = ref("");
const user = ref(null);

const init = () => {
  loading.value = true;
  const userLocal = JSON.parse(localStorage.getItem("user"));
  if (userLocal) {
    user.value = userLocal;
    realName.value = userLocal.name;
    profilePhoto.value = userLocal.avatar;
    email.value = userLocal.email;
  }
  loading.value = false;
};

const handlePhotoChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const toastId = toast.loading("Đang tải ảnh lên...");
      const avatar = await fileToBase64(file, true);
      const res = await api.post(`${URL_API}/user/avatar`, {
        avatar,
      });
      console.log(res);
      if (res.status !== 200) {
        toast.update(toastId, {
          render: res.data.message || "Cập nhật ảnh đại diện thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return;
      }
      toast.update(toastId, {
        render: res.data.message || "Cập nhật ảnh đại diện thành công!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      // save to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      user.avatar = res.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      handleErrorAPI(error);
    } finally {
      event.target.value = null; // Reset the input value to allow re-uploading the same file
    }
  } else {
    toast.error("Vui lòng chọn ảnh!");
  }
};

const changeInfor = async () => {
  try {
    const toastId = toast.loading("Đang cập nhật thông tin...");
    const res = await api.post(`${URL_API}/user/info`, {
      name: realName.value,
      avatar: profilePhoto.value,
    });
    if (res.status !== 200) {
      toast.update(toastId, {
        render: res.data.message || "Cập nhật thông tin thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    toast.update(toastId, {
      render: res.data.message || "Cập nhật thông tin thành công!",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    // save to localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    user.name = realName.value;
    user.avatar = profilePhoto.value;
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    handleErrorAPI(error);
  }
};

const focusRealName = () => {
  const realNameInput = document.getElementById("realName");
  if (realNameInput) {
    realNameInput.focus();
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Không xác định';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Không xác định';
    return date.toLocaleDateString('vi-VN');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Không xác định';
  }
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="user-page" class="user-page">
    <div class="navbar">
      <user-navbar />
    </div>
    <div class="container min-h-[500px]">
      <div v-if="!loading" class="content max-w-[768px] mx-auto mt-6 text-[#424242]">
        <h2 class="text-[20px] font-semibold mb-5">Profile details</h2>
        <div class="flex items-center gap-5 text-[14px] mb-5">
          <img v-if="!profilePhoto" class="w-[128px] h-[128px] rounded-full object-cover"
            src="https://avatar.freepik.com/default_01_313x313.png" />
          <img v-else class="w-[128px] h-[128px] rounded-full object-cover" :src="profilePhoto" />
          <div class="flex items-center gap-4">
            <label for="profilePhotoInput" class="btn" style="font-size: 14px; font-weight: 600">
              Change photo
            </label>
            <input type="file" accept="image/*" class="hidden" id="profilePhotoInput" @change="handlePhotoChange" />
            <p class="hover:underline cursor-pointer" @click="profilePhoto = ''">
              Remove
            </p>
          </div>
        </div>
        <div class="pb-5 border-b border-[#0000001a]">
          <div class="flex items-center">
            <div class="flex flex-col gap-3 w-full">
              <label class="font-semibold text-[14px]" for="realName">Name</label>
              <div class="flex items-center gap-3 w-full">
                <input class="px-4 p-2 text-[14px] bg-[#0000001a] focus:bg-white rounded-md min-w-[40%]" id="realName"
                  type="text" placeholder="Enter name" v-model.trim="realName" />
                <button type="button" class="btn" style="font-weight: 600; font-size: 14px" @click="focusRealName">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center mt-3">
            <div class="flex flex-col gap-3 w-full">
              <label class="font-semibold text-[14px]">Email</label>
              <p class="text-[14px]">{{ email }}</p>
            </div>
          </div>
        </div>
        <div class="pt-5 text-[14px] pb-5 border-b border-[#0000001a]">
          <h3 class="text-[20px] font-semibold mb-4">Subscription Plan</h3>
          <div v-if="user?.is_premium"
            class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 mb-4">
            <div class="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                <path
                  d="M486.2 50.2c-9.6-3.8-20.5-1.3-27.5 6.2l-98.2 125.5-83-161.1C273 13.2 264.9 8.5 256 8.5s-17.1 4.7-21.5 12.3l-83 161.1L53.3 56.5c-7-7.5-17.9-10-27.5-6.2C16.3 54 10 63.2 10 73.5v333c0 35.8 29.2 65 65 65h362c35.8 0 65-29.2 65-65v-333c0-10.3-6.3-19.5-15.8-23.3" />
              </svg>
              <span class="font-bold text-lg">{{ user?.plan || 'Premium Plan' }}</span>
            </div>
            <div class="space-y-1 text-sm">
              <div>Ngày bắt đầu: {{ formatDate(user?.start || user?.start_date) }}</div>
              <div>Ngày hết hạn: {{ formatDate(user?.end || user?.end_date) }}</div>
              <div class="mt-2 text-xs opacity-90">
                Bạn có thể tải xuống tất cả tài nguyên premium
              </div>
            </div>
          </div>
          <div v-else class="bg-gray-100 rounded-lg p-4 mb-4">
            <div class="text-center">
              <h4 class="font-semibold text-gray-700 mb-2">Chưa có gói Premium</h4>
              <p class="text-sm text-gray-600 mb-3">
                Nâng cấp lên Premium để truy cập tất cả tài nguyên
              </p>
              <a href="/pricing"
                class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                Xem các gói
              </a>
            </div>
          </div>
        </div>
        <div class="pt-5 text-[14px] pb-5 border-b border-[#0000001a]">
          <h3 class="text-[20px] font-semibold mb-4">Connected accounts</h3>
          <p>
            Manage the social media accounts connected to your profile for easy login.
          </p>
          <div class="flex items-center mt-5">
            <div class="w-[40%] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img class="w-[20px] h-[20px]" src="https://static.cdnpk.net/_next/static/media/google2.b530652f.svg" />
                <span class="font-bold">Google</span>
              </div>
              <span>Connected</span>
            </div>
          </div>
        </div>
        <div class="my-5 flex justify-end">
          <button type="button" class="btn w-fit bg-[#3b82f6]" style="font-weight: 600; font-size: 14px; color: white"
            @click="changeInfor">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
