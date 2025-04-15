<script setup>
import { ref, onMounted, reactive } from "vue";
import UserNavbar from "../components/UserNavbar.vue";
import { URL_API } from "../constant";
import api from "../utils";
import { toast } from "vue3-toastify";
import { handleErrorAPI } from "../utils";

const loading = ref(false);

const collections = ref([]);

const showModalCollection = ref(false);
const collectionNew = reactive({
  id: null,
  name: "",
  description: "",
});

const init = async () => {
  loading.value = true;
  await getCollections();
};

const getCollections = async () => {
  try {
    const response = await api.get(`${URL_API}/collection/user`);
    if (response.status !== 200) {
      toast.error(response.data.message || "Có lỗi xảy ra");
      return;
    }
    console.log(response);
    collections.value = response.data.data;
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const handleSaveCollection = async () => {
  if (!collectionNew.name) {
    toast.error("Vui lòng nhập tên bộ sưu tập");
    return;
  }
  const toastId = toast.loading("Đang tạo bộ sưu tập...");
  try {
    const response = await api.post(`${URL_API}/collection`, {
      id: collectionNew.id,
      name: collectionNew.name,
      description: collectionNew.description,
    });
    if (response.status !== 201) {
      toast.update(toastId, {
        render: response.data.message || "Có lỗi xảy ra",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    toast.update(toastId, {
      render: response.data.message || "Tạo bộ sưu tập thành công",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    showModalCollection.value = false;
    collectionNew.name = "";
    collectionNew.description = "";
    await getCollections();
  } catch (error) {
    handleErrorAPI(error, toastId);
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
      <div v-if="!loading" class="content max-w-[1400px] mx-auto mt-10 text-[#424242]">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-[20px] font-semibold">My collections</h2>
          <button
            class="btn bg-[#336aea]"
            style="color: #fff"
            @click="showModalCollection = true"
          >
            <span class="me-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-49 141 512 512"
                width="18"
                height="18"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="M413 372H232V191c0-13.807-11.193-25-25-25s-25 11.193-25 25v181H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h181v181c0 13.807 11.193 25 25 25s25-11.193 25-25V422h181c13.807 0 25-11.193 25-25s-11.193-25-25-25"
                ></path>
              </svg>
            </span>
            New collection
          </button>
        </div>
        <div class="list-collection grid grid-cols-4 gap-6 mb-10">
          <div
            v-for="collection in collections"
            :key="collection?.id"
            class="collection-item"
          >
            <a
              href=""
              class="block w-full h-[340px] rounded-lg overflow-hidden hover:opacity-80"
            >
              <div
                v-if="collection?.resources.length === 0"
                class="flex items-center justify-center w-full h-full bg-[#f0f0f0] text-[#9c9c9c]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="48"
                  height="48"
                  fill="currentColor"
                >
                  <path
                    d="M448.9 24.4H189c-34.8 0-63.1 28.3-63.1 63.1v201.8c0 34.8 28.3 63.1 63.1 63.1h259.8c34.8 0 63.1-28.3 63.1-63.1V87.4c.1-34.7-28.2-63-63-63M189 74.4h259.8c7.2 0 13.1 5.9 13.1 13.1v170.1l-30.6-31c-4.7-4.8-11.1-7.4-17.8-7.4s-13.1 2.7-17.8 7.5l-23 23.5-90-90.3c-4.7-4.7-11.1-7.4-17.7-7.4s-13 2.6-17.7 7.3L176 231.2V87.4c0-7.2 5.8-13 13-13"
                  ></path>
                  <path
                    d="M388 172.7c15.8 0 28.6-12.8 28.6-28.6s-12.8-28.6-28.6-28.6-28.6 12.8-28.6 28.6 12.8 28.6 28.6 28.6M326.3 428.1c-2 7-9.2 11-16.2 9.1L59.6 366.9c-3.4-.9-6.2-3.1-7.9-6.2s-2.1-6.6-1.2-10L76 260.1V112.5c-8.8 7.8-15.6 18.1-19 30.3L2.4 337.3c-4.5 16.2-2.5 33.3 5.8 48s21.8 25.3 38 29.8l250.5 70.2c5.7 1.6 11.4 2.3 17 2.3 27.6 0 53-18.3 60.8-46.1l11-39.2h-51.9z"
                  ></path>
                </svg>
              </div>
              <img
                v-else
                class="object-cover w-full h-full"
                :src="collection?.resources[collection?.resources?.length - 1]?.file_url"
                :alt="collection?.name"
              />
            </a>
            <div class="flex justify-between mt-4">
              <div class="text-[14px]">
                <p class="flex items-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-49 141 512 512"
                      width="18"
                      height="18"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path
                        d="M317.383 352.763v-28.167c0-60.865-49.517-110.383-110.383-110.383S96.617 263.73 96.617 324.595v28.167c-22.035 6.163-38.251 26.409-38.251 50.385v124.317c0 28.851 23.472 52.323 52.322 52.323h192.624c28.851 0 52.323-23.472 52.323-52.323V403.147c0-23.975-16.216-44.222-38.252-50.384M207 264.212c33.295 0 60.383 27.088 60.383 60.383v26.23H146.617v-26.23c0-33.295 27.087-60.383 60.383-60.383"
                      ></path>
                    </svg>
                  </span>
                  <span class="text-[16px] font-semibold leading-5">{{
                    collection?.name
                  }}</span>
                </p>
                <span class="text-[#777777]"
                  >{{ collection?.resources?.length || 0 }} resources</span
                >
              </div>
              <button class="h-fit p-2 hover:bg-[#f7f7f7] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M207 503c-27.57 0-50 22.43-50 50s22.43 50 50 50 50-22.43 50-50-22.43-50-50-50m0-156c-27.57 0-50 22.43-50 50s22.43 50 50 50 50-22.43 50-50-22.43-50-50-50m0-56c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModalCollection"
      class="relative z-999 modal-detail"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        style="background-color: rgba(10, 21, 47, 0.9)"
      ></div>
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto"
        @click.stop="showModalCollection = false"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-4 w-[80%] overflow-y-auto p-[40px] pt-[60px] max-w-[640px]"
            @click.stop
          >
            <p class="font-bold text-[20px] text-center mb-5">New collection</p>
            <div class="flex flex-col gap-3 w-full">
              <label class="font-semibold text-[14px]" for="collectionName">
                Name collection
              </label>
              <div class="flex items-center gap-3 w-full">
                <input
                  class="px-4 p-2 text-[14px] bg-white rounded-md w-full border border-[#d8d8d8]"
                  id="collectionName"
                  type="text"
                  placeholder="Enter collection name"
                  v-model.trim="collectionNew.name"
                />
              </div>
            </div>
            <div class="flex flex-col gap-3 w-full mt-6">
              <label class="font-semibold text-[14px]" for="collectionDesc">
                Description (optional)
              </label>
              <div class="flex items-center gap-3 w-full">
                <input
                  class="px-4 p-2 text-[14px] bg-white rounded-md w-full border border-[#d8d8d8]"
                  id="collectionDesc"
                  type="text"
                  placeholder="Enter collection description"
                  v-model.trim="collectionNew.description"
                />
              </div>
            </div>
            <div class="flex items-center justify-between mt-6">
              <button
                type="button"
                class="btn"
                style="font-weight: 600; font-size: 14px"
                @click="showModalCollection = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn w-fit bg-[#3b82f6]"
                style="font-weight: 600; font-size: 14px; color: white"
                @click="handleSaveCollection"
              >
                Create collection
              </button>
            </div>
            <button
              type="button"
              class="absolute top-4 right-4 cursor-pointer"
              @click="showModalCollection = false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-49 141 512 512"
                width="20"
                height="20"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="m242.355 397 127.987-127.987c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L207 361.644 79.013 233.658c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355l127.986 127.986L43.658 524.986c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l127.986-127.986 127.987 127.987c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
