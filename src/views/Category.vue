<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { URL_API } from "../constant";
import { handleErrorAPI } from "../utils";

const url = URL_API;

const query = ref();
const user = ref();
const tags = ref([]);
const categoriesShow = ref([]);
const searchInput = ref();
const resources = ref([]);
const results = ref([]);
const page = ref(1);
const limit = ref(40);
const pagination = ref({});
const resultCol = ref(4);

const init = async () => {
  // get data user
  const userLocal = localStorage.getItem("user");
  if (userLocal && userLocal !== "undefined") {
    user.value = JSON.parse(userLocal);
  } else {
    user.value = null;
  }
  tags.value = await getTagsRandom(5);
  query.value = getQueryParamsFromCurrentUrl();
  categoriesShow.value = await getCategoryById(query.value?.menu);
  // get categories show
  // const categories = await getDataNav();
  // if (query.value?.menu) {
  //   if (query.value?.from_element == "mainmenu") {
  //     categoriesShow.value = categories.find((item) => item.id == query.value.menu);
  //   } else {
  //     // sub menu
  //     const categoryParent = categories.find((item) => item.id == query.value.parent);
  //     categoriesShow.value = categoryParent?.subCategories.find(
  //       (item) => item.id == query.value.menu
  //     );
  //   }
  // }
  resources.value = await getResourcesByCategory(query.value?.menu);
  // tách thành 4 mảng result
  results.value = splitIntoFourEqualParts(resources.value || []);
};

const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${url}/category/${id}`);
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

function splitIntoFourEqualParts(arr) {
  const chunkSize = Math.ceil(arr.length / resultCol.value);
  const result = [
    arr.slice(0, chunkSize),
    arr.slice(chunkSize, chunkSize * 2),
    arr.slice(chunkSize * 2, chunkSize * 3),
    arr.slice(chunkSize * 3),
  ];
  return result;
}

const getResourcesByCategory = async (categoryId) => {
  try {
    const res = await axios.post(`${URL_API}/resource/category/${categoryId}`, {
      page: page.value,
      limit: limit.value,
    });
    console.log(res.data);
    if (res.data?.statusCode !== 200) console.error(res.data);
    pagination.value = res.data?.pagination;
    return res.data?.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

function getQueryParamsFromCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

// get 5 tags ngẫu nhiên
const getTagsRandom = async (number) => {
  try {
    const res = await axios.get(`${url}/tag/random/${number}`);
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

// get data categories
const getDataNav = async () => {
  try {
    const res = await axios.get(`${url}/category/data-navbar`);
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = () => {
  window.location.href = `/search?query=${searchInput.value}`;
};

const handleShowDetail = (item) => {
  const redirectUrl = `/search?query=${item?.tag_name}&detail_id=${item?.id}`;
  window.location.href = redirectUrl;
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="home">
    <section class="banner container">
      <!-- img -->
      <div class="banner-image__bg"></div>
      <div class="banner-image"></div>
      <!-- content -->
      <div class="banner-content container text-white text-center">
        <h1 class="banner-title text-[40px] font-semibold mb-2.5 px-16">
          Smarter creativity, faster designs
        </h1>
        <p class="banner-desc text-[17px] px-16 mb-7">
          Everything you need, from stock images and videos to AI-powered design tools
        </p>
        <div class="banner-search__input px-16 mx-14 mt-4">
          <div class="flex items-center bg-white text-black rounded-4xl h-[46px] px-2">
            <span class="ps-3 pe-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </span>
            <input
              type="text"
              class="p-2.5 outline-0"
              style="flex: 1"
              placeholder="Search all assets"
              v-model="searchInput"
              @keyup.enter="handleSearch"
            />
            <div class="group-actions flex items-center gap-3">
              <button class="btn" style="padding: 10px; display: none">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path
                      d="M150.9 301.8c83.3 0 150.9-67.6 150.9-150.9S234.2 0 150.9 0 0 67.6 0 150.9s67.6 150.9 150.9 150.9m19.4-178.9V227c0 11-8.9 19.9-19.9 19.9s-19.9-8.9-19.9-19.9V122.9L97 156.4c-7.8 7.8-20.3 7.8-28.1 0s-7.8-20.4 0-28.2l67.5-67.6c3.7-3.7 8.8-5.8 14.1-5.8s10.3 2.1 14.1 5.8l67.5 67.6c7.8 7.8 7.8 20.4 0 28.2s-20.4 7.8-28.1 0zm-20.2 213.5V446c0 36.3 29.6 65.9 65.9 65.9h230.1c36.3 0 65.9-29.6 65.9-65.9V215.8c0-36.3-29.5-65.9-65.9-65.9H337.4c0 17.6-2.4 34.6-7 50.7h115.7c8.4 0 15.2 6.8 15.2 15.2V414l-18.7-19c-4.8-4.9-11.4-7.6-18.1-7.6-6.8 0-13.4 2.8-18 7.7l-34.4 35.5-87.5-88c-9.8-9.9-25.9-9.9-35.8-.1L200.9 390v-60.5c-15.9 4.4-32.7 6.8-50 6.8-.3.1-.5.1-.8.1m226.3-86.9c-20.4 0-37 16.5-37 37s16.6 37 37 37 37-16.6 37-37c.1-20.3-16.6-37-37-37"
                    ></path>
                  </svg>
                </span>
              </button>
              <button class="btn" style="padding: 10px; display: none">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-49 141 512 512"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path
                      d="M207 503c-58.448 0-106-47.551-106-106s47.552-106 106-106 106 47.551 106 106-47.551 106-106 106m0-162c-30.879 0-56 25.122-56 56s25.121 56 56 56 56-25.122 56-56-25.121-56-56-56"
                    ></path>
                    <path
                      d="M410.669 427.992a207.1 207.1 0 0 0 0-61.984c31.77-19.008 40.581-58.133 23.033-88.348l-10-17.32c-17.779-30.793-57.123-41.541-88.05-24.213a207 207 0 0 0-53.658-31.027C281.512 169.67 252.541 141 217 141h-20c-35.541 0-64.512 28.67-64.994 64.1a207 207 0 0 0-53.658 31.027c-30.927-17.328-70.271-6.58-88.05 24.213l-10 17.32C-37.25 307.875-28.439 347 3.331 366.008a207.1 207.1 0 0 0 0 61.984c-30.454 18.128-40.807 57.563-23.033 88.348l10 17.32c17.779 30.794 57.123 41.542 88.05 24.213a207 207 0 0 0 53.658 31.027c.483 35.43 29.453 64.1 64.994 64.1h20c35.541 0 64.512-28.67 64.994-64.099a207 207 0 0 0 53.658-31.027c30.927 17.329 70.271 6.581 88.05-24.213l10-17.32c17.775-30.786 7.421-70.221-23.033-88.349m-20.267 63.348-10 17.32c-4.136 7.163-13.329 9.626-20.49 5.49l-14.769-8.526a25 25 0 0 0-29.857 3.658c-18.329 17.682-40.867 30.714-65.178 37.687A25 25 0 0 0 232.001 571v17c0 8.271-6.729 15-15 15h-20c-8.271 0-15-6.729-15-15v-17a25 25 0 0 0-18.107-24.031c-24.311-6.973-46.849-20.004-65.178-37.687a25 25 0 0 0-29.857-3.658L54.09 514.15c-7.161 4.136-16.354 1.672-20.49-5.49l-10-17.32c-4.136-7.163-1.673-16.355 5.49-20.491h-.001l14.733-8.506a25 25 0 0 0 11.767-27.666c-3.044-12.282-4.588-24.958-4.588-37.678s1.544-25.396 4.588-37.677a25 25 0 0 0-11.766-27.666L29.09 323.15c-7.714-4.65-8.964-13.9-5.49-20.49l10-17.32c4.136-7.163 13.328-9.624 20.49-5.49l14.769 8.526a25 25 0 0 0 29.856-3.658c18.33-17.682 40.868-30.714 65.179-37.687A25 25 0 0 0 182.001 223v-17c0-8.271 6.729-15 15-15h20c8.271 0 15 6.729 15 15v17a25 25 0 0 0 18.107 24.031c24.311 6.973 46.849 20.005 65.179 37.687a25 25 0 0 0 29.856 3.658l14.769-8.526c7.162-4.134 16.354-1.673 20.49 5.49l10 17.32c3.474 6.59 2.224 15.84-5.49 20.49l-14.733 8.506a25 25 0 0 0-11.766 27.666 156.8 156.8 0 0 1 4.588 37.677c0 12.719-1.544 25.396-4.588 37.678a25 25 0 0 0 11.767 27.666l14.733 8.506h-.001c7.163 4.136 9.625 13.328 5.49 20.491"
                    ></path>
                  </svg>
                </span>
              </button>
              <button
                class="btn bg-[#336aea]"
                style="color: #fff; border-radius: 20px"
                @click="handleSearch"
              >
                <span class="me-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                    />
                  </svg>
                </span>
                Search
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3 mt-7 mb-10">
          <template v-for="tag in tags" :key="tag.id">
            <a
              :href="`/search?query=${tag.name}`"
              class="btn"
              style="font-size: 12px; border: none"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="12"
                  height="12"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M448.178 602.822 316.426 471.071c26.355-33.88 42.074-76.422 42.074-122.571 0-110.28-89.72-200-200-200s-200 89.72-200 200 89.72 200 200 200c46.149 0 88.691-15.719 122.571-42.074l131.751 131.751c4.882 4.882 11.28 7.323 17.678 7.323s12.796-2.441 17.678-7.322c9.762-9.763 9.762-25.593 0-35.356M8.5 348.5c0-82.71 67.29-150 150-150s150 67.29 150 150-67.29 150-150 150-150-67.29-150-150"
                  ></path>
                </svg>
              </span>
              {{ tag.name }}
            </a>
          </template>
        </div>
      </div>
    </section>

    <section class="pb-10">
      <div class="container">
        <!-- <template v-if="query?.name == 'Photos'">
          <h2 class="text-[32px] text-center font-semibold pt-5">
            The right photo for every moment
          </h2>
          <p class="mb-8 mt-3 text-[#303030] text-[20px] text-center">
            Surf categories of professional photos to express your ideas and connect with
            your audience
          </p>
        </template>
        <template v-else-if="query?.name == 'Videos'">
          <h2 class="text-[32px] text-center font-semibold pt-5">
            Find the perfect video clip
          </h2>
          <p class="mb-8 mt-3 text-[#303030] text-[20px] text-center">
            Browse video categories and find the stock video footage and motion graphics
            you’re looking for
          </p>
        </template> -->
        <template v-if="query?.from_element == 'mainmenu'">
          <span class="hidden text-3xl"></span>
          <div v-html="categoriesShow?.description"></div>
          <div class="grid grid-cols-12 gap-7 mt-8">
            <div v-for="category in categoriesShow?.subCategories" class="col-span-3">
              <a
                class="h-auto flex-row flex-wrap justify-start items-stretch cursor-pointer rounded-lg flex relative overflow-hidden z-0 lg:w-full group w-full"
                :href="`/category?menu=${category.id}&from_element=${categoriesShow?.name}&parent=${categoriesShow?.id}`"
                ><div class="relative w-full overflow-hidden h-auto aspect-[11/7]">
                  <img
                    alt="People and emotions"
                    loading="lazy"
                    width="335"
                    height="208"
                    decoding="async"
                    data-nimg="1"
                    class="relative flex w-full flex-nowrap justify-start rounded-b-none rounded-t-lg object-center group-hover:brightness-75 transition-transform duration-150 hover:scale-[1.03] size-full object-cover"
                    :src="category.img"
                    style="color: transparent"
                  />
                </div>
                <span
                  class="top-0 pointer-events-none absolute w-full rounded-lg h-full"
                ></span>
                <div
                  class="h-fit w-full rounded-b-lg p-4 xl:p-5"
                  style="background: #f7f7f7"
                >
                  <span
                    class="pointer-events-none overflow-x-hidden text-ellipsis font-sans text-sm font-normal text-surface-foreground-2 lg:text-lg"
                    >{{ category?.name }}</span
                  >
                </div>
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="mt-5" v-html="categoriesShow?.description"></div>
          <div
            class="filter-result__product gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6"
          >
            <div class="flex flex-col gap-6">
              <!-- item -->
              <div
                v-for="item in results?.[0]"
                :key="item.id"
                class="filter-result__item relative rounded-lg overflow-hidden cursor-pointer"
                @click="handleShowDetail(item)"
              >
                <div class="cursor-pointer">
                  <video
                    v-if="item?.file_type === 'video'"
                    class="h-full w-full object-cover"
                    @mouseover="playVideo"
                    @mouseleave="stopVideo"
                  >
                    <source :src="item.file_url" type="video/mp4" />
                  </video>
                  <img v-else :src="item?.file_url" :alt="item?.title" />
                </div>
                <div class="absolute bg-opacity pointer-events-none inset-0"></div>
                <div
                  class="absolute btn-actions w-full top-0 right-0 flex flex-col h-full rounded-md ps-3 py-3.5 pe-3.5 text-white"
                >
                  <div class="flex flex-col justify-end flex-wrap z-50 h-full gap-1.5">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <!-- item -->
              <div
                v-for="item in results?.[1]"
                :key="item.id"
                class="filter-result__item relative rounded-lg overflow-hidden cursor-pointer"
                @click="handleShowDetail(item)"
              >
                <div class="cursor-pointer">
                  <video
                    v-if="item?.file_type === 'video'"
                    class="h-full w-full object-cover"
                    @mouseover="playVideo"
                    @mouseleave="stopVideo"
                  >
                    <source :src="item.file_url" type="video/mp4" />
                  </video>
                  <img v-else :src="item?.file_url" :alt="item?.title" />
                </div>
                <div class="absolute bg-opacity pointer-events-none inset-0"></div>
                <div
                  class="absolute btn-actions w-full top-0 right-0 flex flex-col h-full rounded-md ps-3 py-3.5 pe-3.5 text-white"
                >
                  <div class="flex flex-col justify-end flex-wrap z-50 h-full gap-1.5">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <!-- item -->
              <div
                v-for="item in results?.[2]"
                :key="item.id"
                class="filter-result__item relative rounded-lg overflow-hidden cursor-pointer"
                @click.stop="handleShowDetail(item)"
              >
                <div class="cursor-pointer">
                  <video
                    v-if="item?.file_type === 'video'"
                    class="h-full w-full object-cover"
                    @mouseover="playVideo"
                    @mouseleave="stopVideo"
                  >
                    <source :src="item.file_url" type="video/mp4" />
                  </video>
                  <img v-else :src="item?.file_url" :alt="item?.title" />
                </div>
                <div class="absolute bg-opacity pointer-events-none inset-0"></div>
                <div
                  class="absolute btn-actions w-full top-0 right-0 flex flex-col h-full rounded-md ps-3 py-3.5 pe-3.5 text-white"
                >
                  <div class="flex flex-col justify-end flex-wrap z-50 h-full gap-1.5">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <!-- item -->
              <div
                v-for="item in results?.[3]"
                :key="item.id"
                class="filter-result__item relative rounded-lg overflow-hidden cursor-pointer"
                @click="handleShowDetail(item)"
              >
                <div class="cursor-pointer">
                  <video
                    v-if="item?.file_type === 'video'"
                    class="h-full w-full object-cover"
                    @mouseover="playVideo"
                    @mouseleave="stopVideo"
                  >
                    <source :src="item.file_url" type="video/mp4" />
                  </video>
                  <img v-else :src="item?.file_url" :alt="item?.title" />
                </div>
                <div class="absolute bg-opacity pointer-events-none inset-0"></div>
                <div
                  class="absolute btn-actions w-full top-0 right-0 flex flex-col h-full rounded-md ps-3 py-3.5 pe-3.5 text-white"
                >
                  <div class="flex flex-col justify-end flex-wrap z-50 h-full gap-1.5">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style>
#home .banner {
  position: relative;
  height: 300px;
}

#home .banner-image__bg {
  height: 100%;
  width: calc(100% - 40px);
  border-radius: 18px;
}

#home .banner-image {
  border-radius: 18px;
}

#home .banner-content {
  top: 12%;
}

#home .banner-image {
  background-image: url(https://cdn-front.freepik.com/photos/home/bg-photos.webp?w=1440&h=320);
}
</style>
