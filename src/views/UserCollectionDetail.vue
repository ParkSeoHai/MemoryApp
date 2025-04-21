<script setup>
import { ref, onMounted, watch, toRef } from "vue";
import { URL_API } from "../constant";
import api from "../utils";
import { toast } from "vue3-toastify";
import { handleErrorAPI } from "../utils";

const props = defineProps(["collection"]);
const emit = defineEmits(["openEditColection", "openDeleteColection"]);

const loading = ref(false);
const showModal = ref(false);
const resourceDelete = ref(null);
const collection = ref({
  resources: [],
});

watch(
  () => props.collection,
  async (newValue) => {
    if (newValue) {
      await getCollection();
    }
  }
);

const getCollection = async () => {
  try {
    const res = await api.get(`${URL_API}/collection/${props.collection?.id}`);
    if (res.status !== 200) {
      toast.error(res.data.message || "Có lỗi xảy ra");
      return;
    }
    collection.value = { ...res.data.data };
    console.log(res.data);
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const playVideo = (event) => {
  event?.target?.play();
};

const stopVideo = (event) => {
  event?.target?.pause();
};

const openModalRemoveResource = (resource) => {
  showModal.value = true;
  resourceDelete.value = resource;
};

const handleCloseModal = () => {
  showModal.value = false;
  resourceDelete.value = null;
};

const handleRemoveResource = async () => {
  const toastId = toast.loading("Đang xóa...");
  try {
    if (!resourceDelete.value) {
      toast.update(toastId, {
        render: "Vui lòng chọn tài nguyên",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
    const res = await api.delete(
      `${URL_API}/collection/${collection.value?.id}/resource/${resourceDelete.value?.resource_id}`
    );
    if (res.status !== 200 || res.data.statusCode !== 200) {
      toast.update(toastId, {
        render: res.data.message || "Có lỗi xảy ra",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
    toast.update(toastId, {
      render: res.data.message || "Xóa thành công",
      type: "success",
      autoClose: 2000,
      isLoading: false,
    });
    handleCloseModal();
    await getCollection();
  } catch (error) {
    handleErrorAPI(error, toastId);
  }
};

const init = async () => {
  loading.value = true;
  await getCollection();
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="user-page" class="user-page">
    <div class="container min-h-[500px]">
      <div v-if="!loading" class="content max-w-[1400px] mx-auto mt-5 text-[#424242]">
        <div class="mb-5">
          <a
            href="/user/collections"
            class="text-[#336aea] flex items-center gap-3 font-bold text-[14px]"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-49 141 512 512"
                width="13"
                height="13"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="m151.856 397 163.322-163.322c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0l-181 181C93.941 384.203 91.5 390.602 91.5 397s2.441 12.796 7.322 17.678l181 181c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
                ></path>
              </svg>
            </span>
            Back to my collections
          </a>
        </div>
        <div class="flex items-center flex-col justify-center gap-4 mb-5">
          <h2 class="text-[20px] font-semibold">{{ collection?.name }}</h2>
          <div class="flex items-center gap-2 text-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M446.5 36h-283c-35.8 0-65 29.2-65 65v33h-33c-35.8 0-65 29.2-65 65v212c0 35.8 29.2 65 65 65h283c35.8 0 65-29.2 65-65v-33h33c35.8 0 65-29.2 65-65V101c0-35.8-29.2-65-65-65m-283 50h283c8.3 0 15 6.7 15 15v212.5l-55.3-56c-4.7-4.8-11.1-7.4-17.8-7.4s-13.1 2.7-17.8 7.5l-25 25.6-95.3-95.7c-4.7-4.7-11.1-7.4-17.7-7.4s-13 2.6-17.7 7.3l-66.3 66.3V101c-.1-8.3 6.6-15 14.9-15m200 325c0 8.3-6.7 15-15 15h-283c-8.3 0-15-6.7-15-15V199c0-8.3 6.7-15 15-15h33v129.5c0 .8 0 1.5.1 2.3 1.5 34.6 30 62.2 64.9 62.2h200z"
              ></path>
              <circle cx="361.5" cy="166" r="30"></circle>
            </svg>
            {{ collection?.resources?.length || 0 }}
          </div>
          <div class="flex items-center gap-2 text-[13px]">
            <p>
              by <span class="ms-1 font-semibold">{{ collection?.user_name }}</span>
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="btn w-fit"
              style="font-weight: 600; font-size: 14px"
              @click="emit('openEditColection', collection)"
            >
              <span class="flex items-center gap-3"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M149.333 550.378H78.622c-13.807 0-25-11.193-25-25v-70.711c0-6.63 2.634-12.989 7.322-17.678l264.36-264.36c25.344-25.343 66.58-25.343 91.924 0l14.143 14.142c25.344 25.344 25.344 66.581 0 91.924l-264.36 264.36a25 25 0 0 1-17.678 7.323m-45.711-50h35.355L396.016 243.34c5.849-5.848 5.849-15.365 0-21.213l-14.143-14.142c-5.848-5.849-15.365-5.849-21.213 0L103.622 465.023z"
                  ></path>
                  <path
                    d="M375.622 391.013v184.366c0 8.284-6.716 15-15 15h-332c-8.284 0-15-6.716-15-15V243.378c0-8.284 6.716-15 15-15h184.365l50-50H28.622c-35.899 0-65 29.101-65 65v332c0 35.898 29.101 65 65 65h332c35.898 0 65-29.102 65-65V341.013z"
                  ></path>
                </svg>
                Edit collection
              </span>
            </button>
            <button
              type="button"
              class="btn w-fit"
              style="font-weight: 600; font-size: 14px"
              @click="emit('openDeleteColection', collection)"
            >
              <span class="flex items-center gap-3"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M428 231.5H317v-65c0-13.807-11.193-25-25-25H122c-13.807 0-25 11.193-25 25v65H-14c-13.807 0-25 11.193-25 25s11.193 25 25 25h25v306c0 35.841 29.159 65 65 65h262c35.841 0 65-29.159 65-65v-306h25c13.807 0 25-11.193 25-25s-11.193-25-25-25m-281-40h120v40H147zm206 396c0 8.271-6.729 15-15 15H76c-8.271 0-15-6.729-15-15v-306h292z"
                  ></path>
                  <path
                    d="M150 341.5c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25m114 0c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25"
                  ></path>
                </svg>
                Delete
              </span>
            </button>
            <button
              type="button"
              class="btn w-fit"
              style="font-weight: 600; font-size: 14px"
            >
              <span class="flex items-center gap-3"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M358 463c-27.186 0-51.738 11.481-69.071 29.847l-140.285-74.788A95 95 0 0 0 151 397c0-7.243-.818-14.298-2.361-21.081l140.285-74.772C306.257 319.516 330.811 331 358 331c52.383 0 95-42.617 95-95s-42.617-95-95-95-95 42.617-95 95c0 7.232.816 14.277 2.354 21.051L125.056 331.83C107.724 313.475 83.178 302 56 302c-52.383 0-95 42.617-95 95s42.617 95 95 95c27.186 0 51.738-11.481 69.071-29.847l140.285 74.788A95 95 0 0 0 263 558c0 52.383 42.617 95 95 95s95-42.617 95-95-42.617-95-95-95m0-272c24.813 0 45 20.187 45 45s-20.187 45-45 45-45-20.187-45-45 20.187-45 45-45M56 442c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45m302 161c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45"
                  ></path>
                </svg>
                Share
              </span>
            </button>
          </div>
        </div>
        <!-- list resource -->
        <div class="list-collection grid grid-cols-4 gap-6 mb-10 pt-5">
          <div
            v-for="resource in collection.resources"
            :key="resource?.id"
            class="filter-result__item relative rounded-lg overflow-hidden"
            @click="handleShowDetail(item)"
          >
            <a
              :href="`/search?query=${resource?.resource_title}&detail_id=${resource?.resource_id}`"
            >
              <video
                v-if="resource?.file_type === 'video'"
                class="h-full w-full object-cover"
                @mouseover="playVideo"
                @mouseleave="stopVideo"
              >
                <source :src="resource.file_url" type="video/mp4" />
              </video>
              <img
                v-else
                :src="resource?.file_url"
                :alt="resource?.title"
                class="h-full object-cover"
              />
            </a>
            <div class="absolute bg-opacity pointer-events-none inset-0"></div>
            <div
              class="absolute btn-actions w-fit top-0 right-0 flex flex-col h-full rounded-md py-3.5 pe-3.5 text-white"
            >
              <div class="flex flex-col items-end flex-wrap z-50 ms-auto h-full gap-1.5">
                <button
                  class="btn justify-center bg-white w-[35px] h-[35px]"
                  style="color: #333; padding: 4px"
                  title="Download"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                    />
                    <path
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                    />
                  </svg>
                </button>
                <button
                  class="btn justify-center bg-white w-[35px] h-[35px]"
                  style="color: #333; padding: 4px"
                  title="Remove"
                  @click.stop="openModalRemoveResource(resource)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-x"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zm6.339-1.577A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"
                    />
                    <path
                      d="M11.854 10.146a.5.5 0 0 0-.707.708L12.293 12l-1.146 1.146a.5.5 0 0 0 .707.708L13 12.707l1.146 1.147a.5.5 0 0 0 .708-.708L13.707 12l1.147-1.146a.5.5 0 0 0-.707-.708L13 11.293z"
                    />
                  </svg>
                </button>
                <button
                  class="btn justify-center bg-white w-[35px] h-[35px]"
                  style="color: #333; padding: 4px"
                  title="Like"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
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
        @click.stop="showModal = false"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-4 w-[80%] overflow-y-auto p-[40px] pt-[60px] max-w-[640px]"
            @click.stop
          >
            <p class="font-bold text-[20px] text-center mb-5">
              Remove image from collection
            </p>
            <p class="mb-8 text-[15px]">Are you sure you want to remove this image?</p>
            <div class="flex items-center justify-between mt-6">
              <button
                type="button"
                class="btn"
                style="font-weight: 600; font-size: 14px"
                @click="handleCloseModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn w-fit bg-[#3b82f6]"
                style="font-weight: 600; font-size: 14px; color: white"
                @click="handleRemoveResource"
              >
                <span class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-49 141 512 512"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path
                      d="M428 231.5H317v-65c0-13.807-11.193-25-25-25H122c-13.807 0-25 11.193-25 25v65H-14c-13.807 0-25 11.193-25 25s11.193 25 25 25h25v306c0 35.841 29.159 65 65 65h262c35.841 0 65-29.159 65-65v-306h25c13.807 0 25-11.193 25-25s-11.193-25-25-25m-281-40h120v40H147zm206 396c0 8.271-6.729 15-15 15H76c-8.271 0-15-6.729-15-15v-306h292z"
                    ></path>
                    <path
                      d="M150 341.5c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25m114 0c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25"
                    ></path>
                  </svg>
                  Yes, delete
                </span>
              </button>
            </div>
            <button
              type="button"
              class="absolute top-4 right-4 cursor-pointer"
              @click="handleCloseModal"
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
