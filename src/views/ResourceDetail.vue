<script setup>
import { ref, onMounted, toRef } from "vue";
import { URL_API } from "../constant";
import api, { handleErrorAPI } from "../utils";
import { toast } from "vue3-toastify";

const props = defineProps(["data"]);
const emit = defineEmits(["closeModal", "showModalCollection"]);

const user = ref(null);
const dataItem = toRef(props.data?.item);
const slidesKeyword = toRef(props.data?.slides);

const keywordList = ref(null);
const keywordMarginLeft = ref(0);
const maxScrollWidth = ref(0);
const scrollStep = 200;
const author = ref();
const resourcesTags = ref([]);

const showMoreDownload = ref(false);

const sizeImgFiles = ref({
  jpg: "",
  jpeg: "",
  png: "",
  webp: "",
});

const sizeVideoFiles = ref({
  mp4: "",
  webm: "",
});

const getInfoAuthor = async (authorId) => {
  try {
    const response = await api.get(`${URL_API}/user/${authorId}`);
    author.value = response.data.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

const getResourceByTags = async (tags) => {
  try {
    const response = await api.post(`${URL_API}/resource/tags`, {
      tags,
    });
    if (response.data?.statusCode !== 200) console.error(response.data);
    resourcesTags.value = response.data.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

const scrollLeftKeyword = () => {
  if (keywordList.value) {
    // Ngăn scroll nếu đã chạm mép trái (margin không được lớn hơn 0)
    if (keywordMarginLeft.value - scrollStep >= -maxScrollWidth.value) {
      keywordMarginLeft.value -= scrollStep;
      keywordList.value.style.marginLeft = `${keywordMarginLeft.value}px`;
    } else {
      keywordMarginLeft.value = -maxScrollWidth.value;
      keywordList.value.style.marginLeft = `${keywordMarginLeft.value}px`;
    }
  }
};

const scrollRightKeyword = () => {
  if (keywordList.value) {
    // Ngăn scroll nếu đã về đến vị trí gốc (margin-left = 0)
    if (keywordMarginLeft.value + scrollStep <= 0) {
      keywordMarginLeft.value += scrollStep;
      keywordList.value.style.marginLeft = `${keywordMarginLeft.value}px`;
    } else {
      keywordMarginLeft.value = 0;
      keywordList.value.style.marginLeft = `${keywordMarginLeft.value}px`;
    }
  }
};

const playVideo = (event) => {
  event?.target?.play();
};

const stopVideo = (event) => {
  event?.target?.pause();
};

const closeModal = () => {
  emit("closeModal");
};

async function getFormattedFileSizeAfterFormatChange(url, format) {
  // Tạo URL mới với định dạng mong muốn
  const parts = url.split("/");
  const publicId = parts.pop().split(".")[0];
  const baseUrl = parts.join("/");
  const newUrl = `${baseUrl}/${publicId}.${format}`;
  // Fetch file và tạo blob
  const response = await fetch(newUrl);
  const blob = await response.blob();
  const sizeInBytes = blob.size;
  // Format size
  let formattedSize;
  if (sizeInBytes < 1024 * 1024) {
    const kb = (sizeInBytes / 1024).toFixed(2);
    formattedSize = `${kb} KB`;
  } else {
    const mb = (sizeInBytes / (1024 * 1024)).toFixed(2);
    formattedSize = `${mb} MB`;
  }
  return formattedSize;
}

async function downloadFileAsFormat(id, fileName, typeFile, format) {
  try {
    const response = await api.get(`${URL_API}/resource/download/${id}`, {
      responseType: "blob",
      params: {
        fileName,
        typeFile,
        format,
      },
    });
    const disposition = response.headers["content-disposition"];
    if (disposition) {
      const fileNameMatch = disposition.match(/filename\*?=(?:UTF-8'')?"?([^;"\n]+)/);
      if (fileNameMatch && fileNameMatch[1]) {
        fileName = decodeURIComponent(fileNameMatch[1]);
      }
    }
    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    handleErrorAPI(error);
  }
}

const handleDownload = (format) => {
  const fileName = dataItem.value?.title;
  downloadFileAsFormat(dataItem.value.id, fileName, null, format);
};

const handleAddResourceToFavorite = async (item) => {
  try {
    const response = await api.post(`${URL_API}/favorite`, {
      resourceId: item.id,
    });
    if (response.data?.statusCode === 200) {
      toast.success(
        response.data?.message || "Thêm tài nguyên vào yêu thích thành công."
      );
      dataItem.value.is_favorite = 1;
    } else {
      throw new Error("Có lỗi xảy ra trong quá trình thêm tài nguyên vào yêu thích.");
    }
  } catch (error) {
    handleErrorAPI(error);
  }
};

const handleRemoveResourceFavorite = async (item) => {
  try {
    const response = await api.delete(`${URL_API}/favorite/${item.id}`);
    if (response.data?.statusCode === 200) {
      toast.success(
        response.data?.message || "Xóa tài nguyên khỏi yêu thích thành công."
      );
      dataItem.value.is_favorite = 0;
    } else {
      throw new Error("Có lỗi xảy ra trong quá trình xóa tài nguyên khỏi yêu thích.");
    }
  } catch (error) {
    handleErrorAPI(error);
  }
};

const init = async () => {
  const url = new URL(window.location.href); // Lấy URL hiện tại
  user.value = JSON.parse(localStorage.getItem("user"));
  // get data
  await getInfoAuthor(dataItem.value?.user_id);
  const tags = slidesKeyword.value.map((item) => item.title);
  tags.push(dataItem.value?.name);
  await getResourceByTags(tags);
};

onMounted(async () => {
  await init();
  if (keywordList.value) {
    maxScrollWidth.value = keywordList.value.scrollWidth - keywordList.value.offsetWidth;
  }
  if (dataItem.value?.file_type == "image") {
    for (const format in sizeImgFiles.value) {
      sizeImgFiles.value[format] = await getFormattedFileSizeAfterFormatChange(
        dataItem.value.file_url,
        format
      );
    }
  } else if (dataItem.value?.file_type == "video") {
    for (const format in sizeVideoFiles.value) {
      sizeVideoFiles.value[format] = await getFormattedFileSizeAfterFormatChange(
        dataItem.value.file_url,
        format
      );
    }
  }
});
</script>

<template>
  <div
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
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-4 w-[80%] overflow-y-auto"
          style="height: calc(100vh - 50px)"
        >
          <!-- header -->
          <div class="flex items-center bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-start">
              <template v-if="author">
                <a href="#" class="block rounded-full overflow-hidden">
                  <img
                    :src="author?.avatar"
                    :alt="author?.name"
                    class="w-[44px] h-[44px]"
                  />
                </a>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-base font-semibold text-gray-900 cursor-pointer hover:text-[#336aea]"
                    id="modal-title"
                  >
                    <a :href="`/user/${author?.id}`">{{ author?.name }}</a>
                  </h3>
                  <p class="text-sm text-gray-500 hover:underline cursor-pointer">
                    Follow
                  </p>
                </div>
              </template>
            </div>
            <div class="ms-auto">
              <div class="flex items-center btn-download text-[#fff]">
                <button class="btn bg-[#336aea]" @click="handleDownload(null)">
                  <span class="me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-49 141 512 512"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M438 403c-13.808 0-25 11.193-25 25v134c0 19.299-15.701 35-35 35H36c-19.299 0-35-15.701-35-35V428c0-13.807-11.193-25-25-25s-25 11.193-25 25v134c0 46.869 38.131 85 85 85h342c46.869 0 85-38.131 85-85V428c0-13.807-11.192-25-25-25"
                      ></path>
                      <path
                        d="M189.322 530.678a25.004 25.004 0 0 0 35.356 0l84.853-84.853c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L232 452.645V172c0-13.807-11.193-25-25-25s-25 11.193-25 25v280.645l-42.175-42.175c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355z"
                      ></path>
                    </svg>
                  </span>
                  Download
                </button>
                <button
                  class="btn btn-download-more bg-[#336aea]"
                  :class="{ active: showMoreDownload }"
                  @click.prevent="showMoreDownload = !showMoreDownload"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                    ></path>
                  </svg>
                  <ul class="dropdown z-10" v-if="dataItem?.file_type == 'image'">
                    <li class="font-bold">File type</li>
                    <li
                      v-for="(size, format) in sizeImgFiles"
                      :key="format"
                      @click.stop="handleDownload(format)"
                    >
                      <span class="font-semibold">{{ format.toUpperCase() }}</span>
                      <span>{{ size }}</span>
                    </li>
                  </ul>
                  <ul class="dropdown z-10" v-else-if="dataItem?.file_type == 'video'">
                    <li class="font-bold">File type</li>
                    <li
                      v-for="(size, format) in sizeVideoFiles"
                      :key="format"
                      @click.stop="handleDownload(format)"
                    >
                      <span class="font-semibold">{{ format.toUpperCase() }}</span>
                      <span>{{ size }}</span>
                    </li>
                  </ul>
                </button>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="px-4 pt-2 pb-4 sm:px-6 sm:pb-4">
            <div class="flex gap-6 max-h-[550px]">
              <div class="w-[30%] p-4 border border-[#f0f0f0] rounded-lg hidden">
                <p class="font-bold mb-4">AI Tools</p>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src="https://img.freepik.com/free-vector/paper-style-happy-easter-day-background_23-2149296634.jpg?t=st=1744037040~exp=1744040640~hmac=ad790746915fb1d53b5b8cb3f98420d575874588830546474d61ede2a2898ce9&w=996"
                      class="rounded-xl"
                    />
                    <span class="text-[#5b5b5b] text-[14px]">Remove background</span>
                  </div>
                  <div>
                    <img
                      src="https://img.freepik.com/free-vector/paper-style-happy-easter-day-background_23-2149296634.jpg?t=st=1744037040~exp=1744040640~hmac=ad790746915fb1d53b5b8cb3f98420d575874588830546474d61ede2a2898ce9&w=996"
                      class="rounded-xl"
                    />
                    <span class="text-[#5b5b5b] text-[14px]">Remove background</span>
                  </div>
                  <div>
                    <img
                      src="https://img.freepik.com/free-vector/paper-style-happy-easter-day-background_23-2149296634.jpg?t=st=1744037040~exp=1744040640~hmac=ad790746915fb1d53b5b8cb3f98420d575874588830546474d61ede2a2898ce9&w=996"
                      class="rounded-xl"
                    />
                    <span class="text-[#5b5b5b] text-[14px]">Remove background</span>
                  </div>
                  <div>
                    <img
                      src="https://img.freepik.com/free-vector/paper-style-happy-easter-day-background_23-2149296634.jpg?t=st=1744037040~exp=1744040640~hmac=ad790746915fb1d53b5b8cb3f98420d575874588830546474d61ede2a2898ce9&w=996"
                      class="rounded-xl"
                    />
                    <span class="text-[#5b5b5b] text-[14px]">Remove background</span>
                  </div>
                </div>
              </div>
              <div
                class="border border-[#f0f0f0] rounded-lg overflow-hidden w-full px-30 py-8"
              >
                <div class="flex justify-center h-full">
                  <div class="preview relative w-fit">
                    <video
                      v-if="dataItem?.file_type == 'video'"
                      width="1280"
                      height="720"
                      controls=""
                      controlslist="nodownload"
                      playsinline=""
                      autoplay=""
                      loop=""
                      class="h-full"
                    >
                      <source :src="dataItem?.file_url" type="video/mp4" />
                    </video>
                    <img
                      v-else
                      :src="dataItem?.file_url"
                      :alt="dataItem?.title"
                      class="rounded-lg h-full"
                    />
                    <div
                      v-if="dataItem?.file_type == 'image'"
                      class="absolute btn-actions w-fit top-0 right-0 flex flex-col h-full rounded-md py-3.5 pe-3.5 text-white"
                    >
                      <div
                        class="flex flex-col items-end flex-wrap z-50 ms-auto h-full gap-1.5"
                      >
                        <button
                          class="btn justify-center bg-white w-[35px] h-[35px]"
                          style="color: #333; padding: 4px"
                          title="Add to collection"
                          @click.stop="emit('showModalCollection', dataItem)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-folder-plus"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
                            ></path>
                            <path
                              d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
                            ></path>
                          </svg>
                        </button>
                        <button
                          v-if="dataItem?.is_favorite == 1"
                          class="btn justify-center bg-white w-[35px] h-[35px]"
                          style="color: #333; padding: 4px"
                          title="Like"
                          @click.stop="handleRemoveResourceFavorite(dataItem)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#dc3545"
                            class="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            />
                          </svg>
                        </button>
                        <button
                          v-else
                          class="btn justify-center bg-white w-[35px] h-[35px]"
                          style="color: #333; padding: 4px"
                          title="Like"
                          @click.stop="handleAddResourceToFavorite(dataItem)"
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
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p
                      v-if="dataItem?.file_type == 'image'"
                      class="bg-[#121212b3] text-white text-[12px] w-fit px-2 py-1 rounded-lg absolute bottom-2 right-2"
                    >
                      3000px x 2000px / AI, EPS, JPG, FONTS
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 mb-2">
              <h1 class="text-[#424242] font-semibold">
                Paper style happy easter day background
              </h1>
            </div>
            <!-- list keywords -->
            <div class="relative px-3 my-3 keyword-list">
              <div class="overflow-hidden">
                <div
                  ref="keywordList"
                  class="flex items-center gap-3 text-[#424242]"
                  style="transition: margin-left 0.3s ease"
                >
                  <a
                    v-for="(item, index) in slidesKeyword"
                    :href="`/search?query=${item?.title}`"
                    class="btn w-fit text-nowrap"
                    style="font-weight: 400; border-radius: 18px"
                    >{{ item?.title }}</a
                  >
                </div>
              </div>
              <div
                v-if="keywordMarginLeft > -maxScrollWidth"
                class="btn-arrow absolute top-[50%] right-[-20px] justify-center items-center gap-3 -translate-y-1/2 w-[32px] h-full cursor-pointer box-shadow"
                @click="scrollLeftKeyword"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <div
                v-if="keywordMarginLeft < 0"
                class="btn-arrow absolute top-[50%] left-[-20px] justify-center items-center gap-3 -translate-y-1/2 w-[32px] h-full cursor-pointer box-shadow"
                @click="scrollRightKeyword"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-5">
              <p class="text-[#424242] font-semibold">You might also like</p>
            </div>
            <!-- list resources -->
            <div class="mt-4">
              <div class="filter-result__product flex flex-wrap gap-4">
                <!-- item -->
                <div
                  v-for="resourceTag in resourcesTags"
                  :key="resourceTag?.id"
                  class="flex gap-6"
                >
                  <div
                    v-if="resourceTag?.id != dataItem?.id"
                    class="filter-result__item relative rounded-lg overflow-hidden h-[180px]"
                  >
                    <a
                      :href="`/search?query=${resourceTag?.tag_name}&detail_id=${resourceTag?.id}`"
                    >
                      <video
                        v-if="resourceTag?.file_type == 'video'"
                        class="h-full w-full object-cover"
                        @mouseover="playVideo"
                        @mouseleave="stopVideo"
                      >
                        <source :src="resourceTag?.file_url" type="video/mp4" />
                      </video>
                      <img
                        v-else
                        :src="resourceTag?.file_url"
                        :alt="item?.title"
                        class="h-full w-full object-cover"
                      />
                    </a>
                    <div class="absolute bg-opacity pointer-events-none inset-0"></div>
                    <div
                      class="absolute btn-actions w-fit top-0 right-0 flex flex-col h-full rounded-md py-3.5 pe-3.5 text-white"
                    >
                      <div
                        class="flex flex-col items-end flex-wrap z-50 ms-auto h-full gap-1.5"
                      >
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="absolute top-[20px] right-[50px] w-[45px] h-[45px] text-white flex items-center justify-center hover:bg-[#fff3]"
        @click="closeModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-49 141 512 512"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="m242.355 397 127.987-127.987c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L207 361.644 79.013 233.658c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355l127.986 127.986L43.658 524.986c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l127.986-127.986 127.987 127.987c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
