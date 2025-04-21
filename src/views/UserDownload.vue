<script setup>
import { ref, onMounted } from "vue";
import { URL_API } from "../constant";
import api from "../utils";
import { toast } from "vue3-toastify";
import { handleErrorAPI } from "../utils";
import UserNavbar from "../components/UserNavbar.vue";

const categories = ref([]);
const downloads = ref([]);
const page = ref(1);
const limit = ref(10);
const categoryId = ref();
const pagination = ref();

const loading = ref(false);

const getDataNav = async () => {
  try {
    const res = await api.get(`${URL_API}/category/data-navbar`);
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

const getDownloads = async () => {
  try {
    const res = await api.get(
      `${URL_API}/user/download-history?page=${page.value}&limit=${limit.value}&categoryId=${categoryId.value}`
    );
    if (res.data?.statusCode !== 200) console.error(res.data);
    downloads.value = res.data?.data?.data || [];
    pagination.value = res.data?.data?.pagination || null;
    return res.data?.data || [];
  } catch (error) {
    handleErrorAPI(error);
  }
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });
  return formatted.replace(",", " -").replace(" ", " ");
};

const handleClickType = async (category) => {
  categoryId.value = category?.id;
  page.value = 1;
  await getDownloads();
};

const handlePage = async (direction) => {
  if (direction === -1 && pagination.value?.hasPrev) {
    page.value -= 1;
  } else if (direction === 1 && pagination.value?.hasNext) {
    page.value += 1;
  }
  await getDownloads();
};

const init = async () => {
  categories.value = await getDataNav();
  await getDownloads();
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
      <div class="flex mt-5">
        <div class="pe-5 w-[300px]">
          <button
            type="button"
            class="active filter-detail__btn flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-49 141 512 512"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                d="M437.838 214.25h-200c-13.807 0-25 11.193-25 25v59.933L142.151 176.75a25 25 0 0 0-43.3 0l-144.339 250a25 25 0 0 0 21.651 37.5h121.15a135 135 0 0 0-3.475 30.5c0 74.439 60.561 135 135 135s135-60.561 135-135c0-10.486-1.202-20.696-3.475-30.5h77.475c13.807 0 25-11.193 25-25v-200c0-13.807-11.193-25-25-25m-418.374 200 101.037-175 72.383 125.369c-29.306 8.107-54.642 25.865-72.352 49.631zm209.374 165.5c-46.869 0-85-38.131-85-85s38.131-85 85-85 85 38.131 85 85-38.131 85-85 85m184-165.5h-75.693c-18.103-24.293-44.173-42.314-74.307-50.161V264.25h150z"
              ></path>
            </svg>
            <span>Asset type</span>
          </button>
          <div class="filter-detail__more">
            <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
              <li
                v-for="category in categories"
                :key="category?.id"
                :class="{ active: category?.id == categoryId }"
              >
                <button
                  @click.prevent="handleClickType(category)"
                  class="btn"
                  style="font-weight: 400"
                  :disabled="category?.id == categoryId"
                >
                  {{ category.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full px-8 my-5">
          <div
            v-if="downloads.length == 0"
            class="flex flex-col items-center justify-center w-full min-h-[300px] gap-5"
          >
            <span
              class="flex justify-center items-center w-[50px] h-[50px] rounded-xl bg-[#92cdfa80] text-[#648eef]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-49 141 512 512"
                width="16"
                height="16"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="M438 403c-13.808 0-25 11.193-25 25v134c0 19.299-15.701 35-35 35H36c-19.299 0-35-15.701-35-35V428c0-13.807-11.193-25-25-25s-25 11.193-25 25v134c0 46.869 38.131 85 85 85h342c46.869 0 85-38.131 85-85V428c0-13.807-11.192-25-25-25"
                ></path>
                <path
                  d="M189.322 530.678a25.004 25.004 0 0 0 35.356 0l84.853-84.853c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L232 452.645V172c0-13.807-11.193-25-25-25s-25 11.193-25 25v280.645l-42.175-42.175c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355z"
                ></path>
              </svg>
            </span>
            <p class="text-center text-[20px] font-semibold mt-3 mb-2 w-[525px]">
              All your downloaded assets will be shown here... once you get your hands on
              them!
            </p>
            <a
              href="/"
              class="btn w-fit bg-[#3b82f6]"
              style="font-weight: 600; font-size: 14px; color: white"
            >
              Browse memory
            </a>
          </div>
          <div v-else class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Details</th>
                  <th scope="col" class="px-6 py-3">Download date</th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in downloads"
                  :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td class="px-6 py-4">
                    <div class="flex">
                      <a :href="`/search?query=${item?.title}&detail_id=${item?.id}`">
                        <div class="w-[160px] h-[120px]">
                          <video v-if="item?.file_type == 'video'">
                            <source :src="item?.file_url" type="video/mp4" />
                          </video>
                          <img
                            v-else
                            :src="item?.file_url"
                            class="w-full h-full object-contain"
                          />
                        </div>
                      </a>
                      <div class="flex flex-col gap-1 px-3">
                        <a
                          :href="`/search?query=${item?.title}&detail_id=${item?.id}`"
                          class="font-semibold"
                          >{{ item?.title }}</a
                        >
                        <a :href="`/author/${item?.author_name}`"
                          >by <span>@{{ item?.author_name }}</span></a
                        >
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ formatDateTime(item?.downloaded_at) }}</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      type="button"
                      class="btn w-fit"
                      style="
                        font-weight: 600;
                        font-size: 14px;
                        background-color: #121212;
                        color: #fff;
                      "
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
                            d="M438 403c-13.808 0-25 11.193-25 25v134c0 19.299-15.701 35-35 35H36c-19.299 0-35-15.701-35-35V428c0-13.807-11.193-25-25-25s-25 11.193-25 25v134c0 46.869 38.131 85 85 85h342c46.869 0 85-38.131 85-85V428c0-13.807-11.192-25-25-25"
                          ></path>
                          <path
                            d="M189.322 530.678a25.004 25.004 0 0 0 35.356 0l84.853-84.853c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L232 452.645V172c0-13.807-11.193-25-25-25s-25 11.193-25 25v280.645l-42.175-42.175c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355z"
                          ></path>
                        </svg>
                        Download
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="filter-result__bottom flex items-center justify-between mt-4 py-4 px-6"
            >
              <div class="w-[150px]"></div>
              <div class="filter-result__bottom--actions flex items-center gap-3">
                <button
                  v-if="pagination?.hasPrev"
                  class="btn"
                  @click.prevent="handlePage(-1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-49 141 512 512"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    class="$w-[1em] $h-[1em] $fill-current $text-lg"
                  >
                    <path
                      d="M438 372H36.355l72.822-72.822c9.763-9.763 9.763-25.592 0-35.355-9.763-9.764-25.593-9.762-35.355 0l-115.5 115.5a24.996 24.996 0 0 0 0 35.355l115.5 115.5c9.763 9.762 25.593 9.763 35.355 0 9.763-9.763 9.763-25.592 0-35.355L36.355 422H438c13.808 0 25-11.193 25-25s-11.192-25-25-25"
                    ></path>
                  </svg>
                </button>
                <button
                  v-if="pagination?.hasNext"
                  class="btn bg-[#336aea]"
                  style="color: rgb(255, 255, 255)"
                  @click.prevent="handlePage(1)"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-49 141 512 512"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path
                      d="M-24 422h401.645l-72.822 72.822c-9.763 9.763-9.763 25.592 0 35.355 9.763 9.764 25.593 9.762 35.355 0l115.5-115.5a25 25 0 0 0 0-35.355l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355 0-9.763 9.763-9.763 25.592 0 35.355l72.822 72.822H-24c-13.808 0-25 11.193-25 25S-37.808 422-24 422"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-2 text-[#424242]">
                <span>Page</span
                ><input
                  class="w-[60px] rounded-xl px-2 py-1"
                  style="border: 1px solid #e5e5e5"
                  type="number"
                  :value="page"
                /><span>of {{ pagination?.totalPages }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
