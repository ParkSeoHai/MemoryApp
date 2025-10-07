<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { URL_API } from "../constant";

const url = URL_API;
const user = ref();

const showUserDropdown = ref(false);

const categories = ref([]);

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

const init = async () => {
  categories.value = await getDataNav();
  const userLocal = localStorage.getItem("user");
  if (userLocal && userLocal !== "undefined") {
    user.value = JSON.parse(userLocal);
  } else {
    user.value = null;
  }
  console.log(user.value);
};

onMounted(() => {
  init();
});

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header id="header" class="flex items-center">
    <a href="/" class="logo">
      <img src="/logo.svg" class="w-[65px] h-[65px] mt-[8px]" />
      <!-- <svg
        width="160"
        height="44"
        fill="currentColor"
        aria-labelledby="logo-:R54qbm:"
        viewBox="0 0 712 105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M188.21 66.26C187.89 65.93 188.12 65.38 188.58 65.38H190.54C190.54 65.38 190.63 65.38 190.68 65.38C207.77 63.64 222.05 52.6 222.05 33.01C222.05 10.44 203.84 0.0100098 182.98 0.0100098H85.28C83.97 0.0100098 82.9 1.07001 82.9 2.39001V102.54C82.9 103.85 83.96 104.92 85.28 104.92H116.48C117.79 104.92 118.86 103.86 118.86 102.54V70.56C118.86 69.25 119.92 68.18 121.24 68.18H141.52C144.33 68.18 147.01 69.39 148.88 71.49L177.77 104.11C178.39 104.39 178.93 104.63 179.55 104.91H220.73C222.84 104.91 223.9 102.37 222.42 100.86L188.22 66.26H188.21ZM175.2 44.68H121.23C119.92 44.68 118.85 43.62 118.85 42.3V27.13C118.85 25.82 119.91 24.75 121.23 24.75H174.42C182.05 24.75 187.03 28.49 187.03 34.4C187.03 41.25 182.36 44.67 175.2 44.67V44.68Z">
        </path>
        <path
          d="M582.55 0.0100098H551.36C550.046 0.0100098 548.98 1.07557 548.98 2.39001V68.87C548.98 70.1844 550.046 71.25 551.36 71.25H582.55C583.864 71.25 584.93 70.1844 584.93 68.87V2.39001C584.93 1.07557 583.864 0.0100098 582.55 0.0100098Z">
        </path>
        <path
          d="M582.55 85.41H551.36C550.046 85.41 548.98 86.4756 548.98 87.79V102.54C548.98 103.854 550.046 104.92 551.36 104.92H582.55C583.864 104.92 584.93 103.854 584.93 102.54V87.79C584.93 86.4756 583.864 85.41 582.55 85.41Z">
        </path>
        <path
          d="M711.02 101.78L670.88 48.63C669.98 47.44 670.06 45.79 671.06 44.69L708.97 3.11001C710.05 1.92001 709.21 0.0100098 707.6 0.0100098H674.8C673.93 0.0100098 673.1 0.380012 672.52 1.02001L635.92 41.25H635.9C635.78 41.38 635.62 41.48 635.42 41.48H634.1C633.75 41.48 633.48 41.2 633.47 40.86V2.2C633.47 0.990005 632.49 0.0100098 631.28 0.0100098H601.29C600.08 0.0100098 599.1 0.990005 599.1 2.2V102.6C599.1 103.71 600 104.61 601.11 104.61H631.45C632.56 104.61 633.46 103.71 633.46 102.6V83.91C633.46 83.13 633.76 82.37 634.29 81.8L647.61 67.55C647.61 67.55 647.73 67.37 648 67.37H649.8C650.02 67.37 650.15 67.55 650.15 67.55L676.99 103.37C677.57 104.15 678.49 104.61 679.46 104.61H709.6C711.06 104.61 711.9 102.94 711.01 101.77L711.02 101.78Z">
        </path>
        <path
          d="M270.58 23.98H301.09C302.4 23.98 303.47 22.92 303.47 21.6V2.38C303.47 1.07 302.41 0 301.09 0H237.98C236.67 0 235.6 1.06 235.6 2.38V102.53C235.6 103.84 236.66 104.91 237.98 104.91H301.09C302.4 104.91 303.47 103.85 303.47 102.53V83.31C303.47 82 302.41 80.93 301.09 80.93H270.36C269.05 80.93 267.98 79.87 267.98 78.55V66.09C267.98 64.66 269.14 63.49 270.58 63.49H301.09C302.4 63.49 303.47 62.43 303.47 61.11V42.36C303.47 41.05 302.41 39.98 301.09 39.98H270.58C269.15 39.98 267.98 38.82 267.98 37.38V26.54C267.98 25.11 269.14 23.94 270.58 23.94V23.98Z">
        </path>
        <path
          d="M352.6 23.98H383.11C384.42 23.98 385.49 22.92 385.49 21.6V2.38C385.49 1.07 384.43 0 383.11 0H320C318.69 0 317.62 1.06 317.62 2.38V102.53C317.62 103.84 318.68 104.91 320 104.91H383.11C384.42 104.91 385.49 103.85 385.49 102.53V83.31C385.49 82 384.43 80.93 383.11 80.93H352.38C351.07 80.93 350 79.87 350 78.55V66.09C350 64.66 351.16 63.49 352.6 63.49H383.11C384.42 63.49 385.49 62.43 385.49 61.11V42.36C385.49 41.05 384.43 39.98 383.11 39.98H352.6C351.17 39.98 350 38.82 350 37.38V26.54C350 25.11 351.16 23.94 352.6 23.94V23.98Z">
        </path>
        <path
          d="M35.87 23.98H66.38C67.69 23.98 68.76 22.92 68.76 21.6V2.38C68.76 1.07 67.7 0 66.38 0H3.27001C1.96001 0 0.890015 1.06 0.890015 2.38V102.53C0.890015 103.84 1.95001 104.91 3.27001 104.91H30.88C32.19 104.91 33.26 103.85 33.26 102.53L33.28 66.1C33.28 64.67 34.44 63.5 35.88 63.5H66.39C67.7 63.5 68.77 62.44 68.77 61.12V42.37C68.77 41.06 67.71 39.99 66.39 39.99H35.88C34.45 39.99 33.28 38.83 33.28 37.39V26.55C33.28 25.12 34.44 23.95 35.88 23.95L35.87 23.98Z">
        </path>
        <path
          d="M496.49 0.0100098H402.03C400.72 0.0100098 399.65 1.07001 399.65 2.39001V102.54C399.65 103.85 400.71 104.92 402.03 104.92H433.23C434.54 104.92 435.61 103.86 435.61 102.54V69.39C435.61 68.72 436.15 68.18 436.82 68.18H496.65C520.63 68.18 538.8 55.68 538.8 33.61C538.8 11.54 520.63 0.0100098 496.5 0.0100098H496.49ZM491.95 44.68H437.98C436.67 44.68 435.6 43.62 435.6 42.3V27.13C435.6 25.82 436.66 24.76 437.98 24.76H491.17C498.8 24.76 503.78 28.49 503.78 34.41C503.78 41.26 499.11 44.68 491.95 44.68Z"
        ></path>
      </svg> -->
    </a>
    <ul class="nav-header flex items-center ms-10 font-bold">
      <li v-for="category in categories" :key="category.id">
        <a
          :href="
            '/category?menu=' +
            category.id +
            '&from_element=mainmenu' +
            '&name=' +
            category.name
          "
          >{{ category.name }}</a
        >
        <div v-if="category.subCategories?.length > 0" class="nav-header__dropdown">
          <div class="nav-header__dropdown--right">
            <ul class="list-link">
              <!-- <li>
                <a
                  href="#"
                  class="flex items-center hover:underline px-2 pt-3 text-nowrap"
                >
                  Explore all images
                  <span class="ms-1 mt-1">
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
                  </span>
                </a>
              </li>
              <li></li> -->
              <li v-for="sub in category.subCategories.slice(0, 6)" :key="sub.id">
                <a
                  :href="
                    '/category?menu=' +
                    sub.id +
                    `&from_element=${category.name}&name=` +
                    sub.name
                  "
                  class="nav-header__dropdown--item-v2"
                  >{{ sub.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="!user" class="btn-actions ms-auto">
      <a href="/login" class="btn">Sign in</a>
    </div>
    <template v-else>
      <div class="relative ms-auto">
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="showUserDropdown = !showUserDropdown"
        >
          <img :src="user?.avatar" class="w-[24px] h-[24px] rounded-full" />
          <span>
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
          </span>
        </div>
        <div
          v-if="showUserDropdown"
          class="user-dropdown absolute w-[320px] right-0 top-[35px] bg-white z-[999] rounded-md shadow-md"
        >
          <div class="pt-[25px] pb-[5px]">
            <div class="px-[25px] flex items-center gap-4 mb-5">
              <img class="w-[36px] h-[36px] rounded-full" :src="user?.avatar" />
              <div class="text-black text-[14px]">
                <span class="block font-bold">{{ user?.name }}</span>
                <span class="block text-[13px] text-[#424242]">{{ user?.email }}</span>
              </div>
            </div>
            <div class="px-[25px] mb-5">
              <button
                class="btn bg-[#336aea] mt-3 w-full justify-center"
                style="color: #fff; border: none; font-size: 13px; padding: 4px 12px"
              >
                Get a plan
              </button>
              <button
                class="btn bg-white mt-3 w-full justify-center border border-[#d8d8d8]"
                style="font-size: 13px; padding: 4px 12px; color: #424242"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path
                    d="M407.2 255.1c17.7-21.4 27.8-48.1 27.8-75.9C435 112.3 380.7 58 314 58c-43.2 0-81.2 22.4-102.9 56.1-16.1-10.8-35.3-16.8-54.9-16.8-54.3 0-98.6 43.9-98.6 97.9 0 20.2 6.5 39.6 18.1 55.9-16.6 10.1-31.5 23.2-43.4 38.7C11.2 317.2 0 350.1 0 384.7c0 13.8 11.2 25 25 25h92c-.6 6.4-1 12.8-1 19.3 0 13.8 11.2 25 25 25h346c13.8 0 25-11.2 25-25 0-73.1-41.5-139.7-104.8-173.9M53 359.7c9-36.4 37-66.5 74.3-77.1 9.7-2.8 16.7-11.1 18-21 1.2-10-3.7-19.7-12.4-24.7-15.6-8.9-25.2-24.8-25.2-41.6 0-26.4 21.8-47.9 48.6-47.9 14 0 27.5 6.2 36.8 16.8-.6 4.9-.9 10-.9 15 0 27.7 10.4 54.6 28.5 76.1-42.3 23-74.8 60.4-91.7 104.5H53zM168.2 404c9.7-55 50.9-101.4 106.7-117.3 9.7-2.8 16.7-11.1 18-21s-3.7-19.7-12.4-24.7c-23.3-13.3-38.4-37.6-38.4-61.8 0-18.9 7.5-36.7 21.2-50.2s31.7-20.9 50.8-20.9c39.1 0 71 31.9 71 71.1 0 25-14.3 48.6-37.4 61.8-8.7 5-13.6 14.7-12.4 24.7s8.3 18.3 18 21c55.8 15.9 97 62.4 106.7 117.3z"
                  ></path>
                </svg>
                Add members
              </button>
            </div>
            <div class="border border-[#e5e5e5]"></div>
            <div class="mt-1">
              <a
                href="/user/me"
                class="px-[25px] h-[45px] w-full flex items-center gap-3 text-[#121212] hover:bg-[#f0f0f0]"
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
                    d="M423 638H-9c-13.807 0-25-11.193-25-25 0-53.438 17.131-104.058 49.542-146.388 22.2-28.994 50.961-52.656 83.376-69.006C75.53 371.377 62 337.07 62 301c0-79.953 65.047-145 145-145s145 65.047 145 145c0 36.07-13.53 70.377-36.918 96.606 32.416 16.349 61.177 40.012 83.376 69.005C430.869 508.942 448 559.562 448 613c0 13.807-11.193 25-25 25M17.657 588h378.687c-9.908-74.383-63.38-137.724-136.792-158.682a25 25 0 0 1-5.533-45.75C283.615 366.669 302 335.03 302 301c0-52.383-42.617-95-95-95s-95 42.617-95 95c0 34.03 18.386 65.668 47.981 82.568a25 25 0 0 1 12.423 24.712 25 25 0 0 1-17.956 21.038C81.037 450.276 27.564 513.617 17.657 588"
                  ></path>
                </svg>
                <p>Account</p>
              </a>
              <a
                href="/user/downloads"
                class="px-[25px] h-[45px] w-full flex items-center gap-3 text-[#121212] hover:bg-[#f0f0f0]"
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
                <p>Downloads</p>
              </a>
            </div>
            <div class="border border-[#e5e5e5]"></div>
            <div class="mt-1">
              <button
                class="px-[25px] h-[45px] w-full flex items-center gap-3 text-[#121212] hover:bg-[#f0f0f0]"
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
                    d="M207 372c-13.807 0-25-11.193-25-25V166c0-13.807 11.193-25 25-25s25 11.193 25 25v181c0 13.807-11.193 25-25 25"
                  ></path>
                  <path
                    d="M370.342 258.658c-27.847-27.847-61.558-47.693-98.342-58.419v52.84C339.785 279.251 388 345.096 388 422c0 99.804-81.196 181-181 181S26 521.804 26 422c0-76.904 48.215-142.749 116-168.921v-52.84c-36.784 10.726-70.494 30.572-98.342 58.419C.028 302.288-24 360.298-24 422S.028 541.712 43.658 585.342 145.298 653 207 653s119.712-24.028 163.342-67.658S438 483.702 438 422s-24.028-119.712-67.658-163.342"
                  ></path>
                </svg>
                <p>Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Mobile menu button -->
    <button class="md:hidden mobile-menu-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
  </header>
</template>
