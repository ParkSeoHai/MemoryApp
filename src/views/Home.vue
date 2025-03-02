<script setup>
import { ref, onMounted, watch } from "vue";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const url = "http://localhost:3000";

const categories = ref([]);
const tags = ref([]);

const swiperContainer = ref(null);
const swiperInstance = ref(null);
const slides = ref([]);
const favorites = ref([]);

const bannerTabIndex = ref(0);

const initSwiper = () => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy(); // Hủy instance cũ nếu có
  }
  swiperInstance.value = new Swiper(swiperContainer.value, {
    modules: [Navigation],
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

watch(slides, () => {
  setTimeout(() => {
    swiperInstance.value?.update(); // Cập nhật lại Swiper khi dữ liệu thay đổi
  }, 100);
});

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

// get top most downloaded resource
const getTopDownloadsByType = async (file_type) => {
  try {
    const res = await axios.post(`${url}/resource/top-downloads`, {
      file_type,
      number: 10,
    });
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// get top most favorites resource
const getTopFavorites = async (number, file_type = "") => {
  try {
    const res = await axios.post(`${url}/resource/top-favorites`, {
      file_type,
      number,
    });
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// get 5 tags ngẫu nhiên
const getTagsRandom = async (number) => {
  try {
    const res = await axios.get(`${url}/tag/random/${number}`);
    if (res.data?.statusCode !== 200) console.error(res.data);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

const changeBannerTab = async (tabIndex, file_type) => {
  bannerTabIndex.value = tabIndex;
  slides.value = await getTopDownloadsByType(file_type);
};

const playVideo = (event) => {
  event?.target?.play();
};

const stopVideo = (event) => {
  event?.target?.pause();
};

const init = async () => {
  categories.value = await getDataNav();
  slides.value = await getTopDownloadsByType();
  tags.value = await getTagsRandom(5);
  favorites.value = await getTopFavorites(9);
};

onMounted(() => {
  initSwiper();
  init();
});
</script>

<template>
  <div id="home">
    <section class="banner">
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
        <div class="flex justify-center">
          <button
            class="flex items-center gap-3 text-[15px] bg-white text-black rounded-3xl px-6 py-2 font-semibold"
          >
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                /></svg></span
            >Search
          </button>
        </div>
        <div class="banner-search__input px-16 mx-14 mt-4">
          <div class="flex items-center bg-white text-black rounded-lg h-[56px] px-2">
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
            />
            <div class="group-actions flex items-center gap-3">
              <button class="btn" style="padding: 10px">
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
              <button class="btn" style="padding: 10px">
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
              <button class="btn bg-[#336aea]" style="color: #fff">
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
        <div class="banner-slide flex">
          <div class="banner-slide__left">
            <ul class="flex flex-col items-start gap-3.5 text-[17px] font-semibold">
              <li
                @click="changeBannerTab(0)"
                class="flex items-center gap-2 cursor-pointer hover:text-[#fff]"
                :class="[bannerTabIndex === 0 ? 'text-white' : 'text-[#9c9c9c]']"
              >
                Top
                <span class="mt-0.5"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-49 141 512 512"
                    width="17"
                    height="17"
                    fill="#fff"
                    aria-hidden="true"
                  >
                    <path
                      d="M349.763 641.694c-3.979 0-7.973-.949-11.631-2.872L207 569.882l-131.132 68.94a25 25 0 0 1-36.274-26.355l25.044-146.018-106.088-103.41a24.999 24.999 0 0 1 13.856-42.642l146.61-21.304 65.566-132.852a25 25 0 0 1 44.837.001l65.566 132.852 146.61 21.304a25 25 0 0 1 13.856 42.642L349.363 466.45l25.044 146.018a25.002 25.002 0 0 1-24.644 29.226M207.001 516.638c3.996 0 7.992.957 11.634 2.872l97.929 51.484-18.704-109.046a25 25 0 0 1 7.19-22.128l79.227-77.227-109.488-15.909a25 25 0 0 1-18.824-13.676l-48.964-99.213-48.964 99.213a25 25 0 0 1-18.824 13.676L29.724 362.593l79.227 77.227a25 25 0 0 1 7.19 22.128L97.438 570.994l97.929-51.484a25 25 0 0 1 11.634-2.872"
                    ></path></svg
                ></span>
              </li>
              <li
                @click="changeBannerTab(1, 'image')"
                class="cursor-pointer hover:text-[#fff]"
                :class="[bannerTabIndex === 1 ? 'text-white' : 'text-[#9c9c9c]']"
              >
                Images
              </li>
              <li
                @click="changeBannerTab(2, 'video')"
                class="cursor-pointer hover:text-[#fff]"
                :class="[bannerTabIndex === 2 ? 'text-white' : 'text-[#9c9c9c]']"
              >
                Videos
              </li>
            </ul>
          </div>
          <div class="banner-slide__right">
            <div class="swiper" ref="swiperContainer">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                  <a
                    v-if="slide?.file_type === 'image'"
                    href="#"
                    class="swiper-slide__link"
                  >
                    <img class="w-full h-full object-cover" :src="slide.file_url" />
                    <div class="swiper-slide__text font-semibold">
                      <p class="text-[14px]">{{ slide.title }}</p>
                      <p class="text-[12px]">{{ slide.description }}</p>
                    </div>
                  </a>
                  <a
                    v-else-if="slide?.file_type === 'video'"
                    href="#"
                    class="swiper-slide__link"
                  >
                    <video
                      class="h-full w-full object-cover"
                      @mouseover="playVideo"
                      @mouseleave="stopVideo"
                    >
                      <source :src="slide.file_url" type="video/mp4" />
                    </video>
                    <div class="swiper-slide__text font-semibold">
                      <p class="text-[14px]">{{ slide.title }}</p>
                      <p class="text-[12px]">{{ slide.description }}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="swiper-button-next">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    d="M262.145 397 98.822 560.323c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l181-181c4.882-4.881 7.323-11.279 7.323-17.677s-2.441-12.796-7.322-17.678l-181-181c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355z"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="swiper-button-prev">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    d="m151.856 397 163.322-163.322c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0l-181 181C93.941 384.203 91.5 390.602 91.5 397s2.441 12.796 7.322 17.678l181 181c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-[584px]"></div>

    <section class="pb-10">
      <div class="container">
        <h2 class="text-[32px] font-semibold pt-5">Millions of assets ready to go</h2>
        <div class="grid grid-cols-8 gap-7 mt-8">
          <a
            v-for="category in categories"
            :key="category.id"
            href="#"
            class="flex flex-col items-center justify-center gap-2 font-semibold bg-[#f7f7f7] rounded-lg h-[112px] hover:scale-105"
            style="transition: scale 0.3s linear"
          >
            <img :src="category.img" class="w-[18px] h-[18px]" />
            <span>{{ category.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="flex items-center justify-center bg-[#f0f4fd] rounded-lg h-[84px]">
        <p class="text-[17px] font-semibold me-8">
          Sign up for 10 daily free downloads and access to AI tools
        </p>
        <button
          class="btn bg-black"
          style="color: #fff; padding: 10px 20px; font-size: 15px"
        >
          Sign up now
        </button>
      </div>
    </div>

    <section
      class="container home-designers"
      style="padding-top: 60px; padding-bottom: 40px"
    >
      <div>
        <h2 class="text-[36px] text-center mb-2.5 font-semibold">Designers’ faves</h2>
        <p class="text-[#424242] text-center">
          Check out what’s getting the most <i>olés</i> on Freepik right now
        </p>
        <div class="flex items-center justify-center gap-3 mt-7 mb-10">
          <template v-for="tag in tags" :key="tag.id">
            <button class="btn" style="font-size: 12px">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="12"
                  height="12"
                  aria-hidden="true"
                >
                  <path
                    d="M448.178 602.822 316.426 471.071c26.355-33.88 42.074-76.422 42.074-122.571 0-110.28-89.72-200-200-200s-200 89.72-200 200 89.72 200 200 200c46.149 0 88.691-15.719 122.571-42.074l131.751 131.751c4.882 4.882 11.28 7.323 17.678 7.323s12.796-2.441 17.678-7.322c9.762-9.763 9.762-25.593 0-35.356M8.5 348.5c0-82.71 67.29-150 150-150s150 67.29 150 150-67.29 150-150 150-150-67.29-150-150"
                  ></path>
                </svg>
              </span>
              {{ tag.name }}
            </button>
          </template>
        </div>
        <div class="home-designers__product grid grid-cols-7 grid-rows-3 gap-7">
          <template v-for="favorite in favorites" :key="favorite.id">
            <template v-if="favorite.file_type === 'video'">
              <a
                href="#"
                class="home-designers__product--item relative h-[220px] rounded-lg font-bold overflow-hidden"
              >
                <video
                  class="h-full w-full object-cover"
                  @mouseover="playVideo"
                  @mouseleave="stopVideo"
                >
                  <source :src="favorite.file_url" type="video/mp4" />
                </video>
                <div class="absolute inset-0 pointer-events-none"></div>
                <p
                  class="absolute pointer-events-none z-10 flex items-end inset-0 p-3.5 text-white text-[15px]"
                >
                  {{ favorite.title }}
                </p>
                <div
                  class="absolute inset-0 pointer-events-none"
                  style="
                    background: linear-gradient(
                      180deg,
                      transparent 40%,
                      rgba(0, 0, 0, 0.5)
                    );
                  "
                ></div>
              </a>
            </template>
            <template v-else>
              <a
                href="#"
                class="home-designers__product--item relative h-[220px] rounded-lg font-bold overflow-hidden"
              >
                <img
                  class="hover:scale-105 w-full h-full object-cover"
                  style="transition: scale 0.3s linear"
                  :src="favorite.file_url"
                />
                <div class="absolute inset-0 pointer-events-none"></div>
                <p
                  class="absolute pointer-events-none z-10 flex items-end inset-0 p-3.5 text-white text-[15px]"
                >
                  {{ favorite.title }}
                </p>
                <div
                  class="absolute inset-0 pointer-events-none"
                  style="
                    background: linear-gradient(
                      180deg,
                      transparent 40%,
                      rgba(0, 0, 0, 0.5)
                    );
                  "
                ></div>
              </a>
            </template>
          </template>
        </div>
      </div>
    </section>

    <section class="container" style="padding: 40px 0">
      <div>
        <h2 class="text-[56px] font-semibold text-center mb-3.5">Get inspired</h2>
        <p class="text-[17px] text-[#424242] text-center">
          Discover thousands of amazing images created by Freepik’s AI artists
        </p>
        <div class="home-inspired grid grid-cols-4 gap-8 mt-8">
          <div class="flex flex-col gap-8">
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/magnific-cat.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
          </div>
          <div class="flex flex-col gap-8">
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/magnific-cat.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
          </div>
          <div class="flex flex-col gap-8">
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/resource-tti-10.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
          </div>
          <div class="flex flex-col gap-8">
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/resource-tti-15.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
            <a href="#" class="home-inspired__item relative overflow-hidden">
              <img
                class="rounded-md"
                src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/magnific-robot.webp"
              />
              <div
                class="absolute flex flex-col justify-end inset-0 pointer-events-none rounded-md p-3.5 text-white"
              >
                <p class="home-inspired__text">
                  A young Asian woman in a long white dress in motion and an astronaut
                  helmet, standing in a desert landscape with red sand dunes in the
                  background
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <div style="padding: 80px 80px 120px 80px">
        <div class="text-center font-semibold">
          <h4 class="text-[#336aea] text-[14px] uppercase mb-1">Freepik in numbers</h4>
          <h2 class="text-[56px] mb-3.5">Growing every second</h2>
          <p class="text-[#424242]">Creativity never stops, and neither do we.</p>
          <button
            class="btn bg-black mx-auto mt-6 mb-2.5"
            style="color: #fff; font-size: 15px"
          >
            Sign up for free
          </button>
        </div>
        <div class="flex gap-12 mt-24">
          <div class="flex flex-col gap-3 items-center text-[#15BCB2] text-center">
            <h3 class="text-[64px] font-semibold">1B+</h3>
            <h4 class="text-[20px] font-semibold">AI images created, and counting</h4>
            <p class="text-[15px] text-[#424242]">
              AI-powered generation happening in real-time like never before.
            </p>
          </div>
          <div class="flex flex-col gap-3 items-center text-[#EB644C] text-center">
            <h3 class="text-[64px] font-semibold">64M+</h3>
            <h4 class="text-[20px] font-semibold">Happy creatives</h4>
            <p class="text-[15px] text-[#424242]">
              Join a growing community of innovators shaping the future of creativity.
            </p>
          </div>
          <div class="flex flex-col gap-3 items-center text-[#336AEA] text-center">
            <h3 class="text-[64px] font-semibold">247M+</h3>
            <h4 class="text-[20px] font-semibold">Ready-to-use stock assets</h4>
            <p class="text-[15px] text-[#424242]">
              Icons, videos, audio, images, vectors, and more all ready for your next
              project.
            </p>
          </div>
          <div class="flex flex-col gap-3 items-center text-[#B07CC6] text-center">
            <h3 class="text-[64px] font-semibold">600K+</h3>
            <h4 class="text-[20px] font-semibold">Subscribers</h4>
            <p class="text-[15px] text-[#424242]">
              Unlocking creativity with Premium features and limitless possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
