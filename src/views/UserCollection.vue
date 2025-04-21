<script setup>
import { ref, onMounted, reactive } from "vue";
import { URL_API } from "../constant";
import api from "../utils";
import { toast } from "vue3-toastify";
import { handleErrorAPI } from "../utils";
import UserNavbar from "../components/UserNavbar.vue";
import UserCollectionDetail from "./UserCollectionDetail.vue";

const loading = ref(false);

const collections = ref([]);
const collectionDetail = ref();

const queryParams = ref();
const isDeleteCollection = ref(false);
const showModalCollection = ref(false);
const collectionNew = reactive({
  id: null,
  name: "",
  description: "",
});

const init = async () => {
  loading.value = true;
  queryParams.value = getQueryParamsFromCurrentUrl();
  collectionDetail.value = {
    id: queryParams.value.id,
    name: "",
    description: "",
  };
  if (!collectionDetail.value.id) {
    await getCollections();
  }
  loading.value = false;
};

function getQueryParamsFromCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

const getCollections = async () => {
  try {
    const response = await api.get(`${URL_API}/collection/user`);
    if (response.status !== 200) {
      toast.error(response.data.message || "Có lỗi xảy ra");
      return;
    }
    collections.value = response.data.data;
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const handleDeleteCollection = async (id) => {
  const toastId = toast.loading("Đang xóa bộ sưu tập...");
  try {
    const response = await api.delete(`${URL_API}/collection/${id}`);
    if (response.status !== 200) {
      toast.update(toastId, {
        render: response.data.message || "Có lỗi xảy ra",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    toast.update(toastId, {
      render: response.data.message || "Xóa bộ sưu tập thành công",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    handleCloseModalCollection();
    await getCollections();
  } catch (error) {
    handleErrorAPI(error, toastId);
  }
};

const handleSaveCollection = async () => {
  if (isDeleteCollection.value && collectionNew.id) {
    await handleDeleteCollection(collectionNew.id);
    return;
  }
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
    handleCloseModalCollection();
    if (!queryParams.value.id) {
      await getCollections();
    } else {
      collectionDetail.value = {
        id: response.data.data.id,
        name: response.data.data.name,
        description: response.data.data.description,
      };
    }
  } catch (error) {
    handleErrorAPI(error, toastId);
  }
};

const handleShowDropdown = (e) => {
  const parent = e.target.closest(".btn-collection-more");
  if (!parent) return;
  const dropdown = parent.querySelector(".dropdown");
  dropdown.classList.toggle("show");
};

const handleShowEdit = (collection) => {
  collectionNew.id = collection?.id;
  collectionNew.name = collection?.name;
  collectionNew.description = collection?.description;
  showModalCollection.value = true;
};

const handleShowDelete = (collection) => {
  isDeleteCollection.value = true;
  showModalCollection.value = true;
  collectionNew.id = collection?.id;
};

const handleCloseModalCollection = () => {
  showModalCollection.value = false;
  isDeleteCollection.value = false;
  collectionNew.id = null;
  collectionNew.name = "";
  collectionNew.description = "";
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="user-page" class="user-page">
    <user-collection-detail
      v-if="queryParams?.id"
      :collection="collectionDetail"
      @openEditColection="handleShowEdit"
      @openDeleteColection="handleShowDelete"
    />
    <template v-else>
      <div v-if="!loading" class="navbar">
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
                :href="`/user/collections?id=${collection?.id}`"
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
                <template v-else>
                  <video
                    v-if="
                      collection?.resources[collection?.resources?.length - 1]
                        ?.file_type === 'video'
                    "
                    class="h-full w-full object-cover"
                    @mouseover="playVideo"
                    @mouseleave="stopVideo"
                  >
                    <source
                      :src="
                        collection?.resources[collection?.resources?.length - 1]?.file_url
                      "
                      type="video/mp4"
                    />
                  </video>
                  <img
                    v-else
                    class="object-cover w-full h-full"
                    :src="
                      collection?.resources[collection?.resources?.length - 1]?.file_url
                    "
                    :alt="collection?.name"
                  />
                </template>
              </a>
              <div class="flex justify-between mt-4">
                <div class="text-[14px]">
                  <a
                    :href="`/user/collections?id=${collection?.id}`"
                    class="flex items-center gap-2"
                  >
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
                  </a>
                  <span class="text-[#777777]"
                    >{{ collection?.resources?.length || 0 }} resources</span
                  >
                </div>
                <button
                  class="h-fit p-2 hover:bg-[#f7f7f7] rounded-lg btn-collection-more relative"
                  @click="handleShowDropdown"
                >
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
                        d="M207 503c-27.57 0-50 22.43-50 50s22.43 50 50 50 50-22.43 50-50-22.43-50-50-50m0-156c-27.57 0-50 22.43-50 50s22.43 50 50 50 50-22.43 50-50-22.43-50-50-50m0-56c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50"
                      ></path>
                    </svg>
                  </span>
                  <ul class="dropdown text-[14px]" @click.stop="">
                    <li
                      class="flex items-center gap-4 px-5 py-1 hover:bg-[#f0f0f0]"
                      @click="handleShowEdit(collection)"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="-49 141 512 512"
                          width="14"
                          height="14"
                          aria-hidden="true"
                        >
                          <path
                            d="M149.333 550.378H78.622c-13.807 0-25-11.193-25-25v-70.711c0-6.63 2.634-12.989 7.322-17.678l264.36-264.36c25.344-25.343 66.58-25.343 91.924 0l14.143 14.142c25.344 25.344 25.344 66.581 0 91.924l-264.36 264.36a25 25 0 0 1-17.678 7.323m-45.711-50h35.355L396.016 243.34c5.849-5.848 5.849-15.365 0-21.213l-14.143-14.142c-5.848-5.849-15.365-5.849-21.213 0L103.622 465.023z"
                          ></path>
                          <path
                            d="M375.622 391.013v184.366c0 8.284-6.716 15-15 15h-332c-8.284 0-15-6.716-15-15V243.378c0-8.284 6.716-15 15-15h184.365l50-50H28.622c-35.899 0-65 29.101-65 65v332c0 35.898 29.101 65 65 65h332c35.898 0 65-29.102 65-65V341.013z"
                          ></path>
                        </svg>
                      </span>
                      Edit
                    </li>
                    <li
                      class="flex items-center gap-4 px-5 py-1 hover:bg-[#f0f0f0]"
                      @click="handleShowDelete(collection)"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="-49 141 512 512"
                          width="14"
                          height="14"
                          aria-hidden="true"
                        >
                          <path
                            d="M428 231.5H317v-65c0-13.807-11.193-25-25-25H122c-13.807 0-25 11.193-25 25v65H-14c-13.807 0-25 11.193-25 25s11.193 25 25 25h25v306c0 35.841 29.159 65 65 65h262c35.841 0 65-29.159 65-65v-306h25c13.807 0 25-11.193 25-25s-11.193-25-25-25m-281-40h120v40H147zm206 396c0 8.271-6.729 15-15 15H76c-8.271 0-15-6.729-15-15v-306h292z"
                          ></path>
                          <path
                            d="M150 341.5c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25m114 0c-13.807 0-25 11.193-25 25v151c0 13.807 11.193 25 25 25s25-11.193 25-25v-151c0-13.807-11.193-25-25-25"
                          ></path>
                        </svg>
                      </span>
                      Delete
                    </li>
                    <li class="flex items-center gap-4 px-5 py-1 hover:bg-[#f0f0f0]">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="-49 141 512 512"
                          width="14"
                          height="14"
                          aria-hidden="true"
                        >
                          <path
                            d="M358 463c-27.186 0-51.738 11.481-69.071 29.847l-140.285-74.788A95 95 0 0 0 151 397c0-7.243-.818-14.298-2.361-21.081l140.285-74.772C306.257 319.516 330.811 331 358 331c52.383 0 95-42.617 95-95s-42.617-95-95-95-95 42.617-95 95c0 7.232.816 14.277 2.354 21.051L125.056 331.83C107.724 313.475 83.178 302 56 302c-52.383 0-95 42.617-95 95s42.617 95 95 95c27.186 0 51.738-11.481 69.071-29.847l140.285 74.788A95 95 0 0 0 263 558c0 52.383 42.617 95 95 95s95-42.617 95-95-42.617-95-95-95m0-272c24.813 0 45 20.187 45 45s-20.187 45-45 45-45-20.187-45-45 20.187-45 45-45M56 442c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45m302 161c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45"
                          ></path>
                        </svg>
                      </span>
                      Share
                    </li>
                  </ul>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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
            <!-- delete -->
            <template v-if="isDeleteCollection">
              <p class="font-bold text-[20px] text-center mb-5">Remove Collection?</p>
              <p class="mb-8 text-[15px]">
                This willl permanently delete all the assets in this collection, but any
                liked items will still be available in Favorites
              </p>
            </template>
            <!-- add / update -->
            <template v-else>
              <p class="font-bold text-[20px] text-center mb-5">
                {{ collectionNew.id ? "Edit collection" : "New collection" }}
              </p>
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
            </template>
            <div class="flex items-center justify-between mt-6">
              <button
                type="button"
                class="btn"
                style="font-weight: 600; font-size: 14px"
                @click="handleCloseModalCollection"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn w-fit bg-[#3b82f6]"
                style="font-weight: 600; font-size: 14px; color: white"
                @click="handleSaveCollection"
              >
                <span v-if="isDeleteCollection" class="flex items-center gap-3">
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
                <span v-else>
                  {{ collectionNew.id ? "Save change" : "Create collection" }}
                </span>
              </button>
            </div>
            <button
              type="button"
              class="absolute top-4 right-4 cursor-pointer"
              @click="handleCloseModalCollection"
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
