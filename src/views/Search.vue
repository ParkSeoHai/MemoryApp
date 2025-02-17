<script setup>
import { ref, onMounted, nextTick } from "vue";

const slides = ref([
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image Generator",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
  {
    title: "AI Image",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" aria-hidden="true">
      <path d="M388 191H26c-35.841 0-65 29.159-65 65v281.995q0 .623.031 1.246C-38.302 574.509-9.425 603 26 603h362c35.841 0 65-29.159 65-65V256c0-35.841-29.159-65-65-65M26 241h362c8.271 0 15 6.729 15 15v282a14.9 14.9 0 0 1-1.386 6.258l-75.936-75.936c-9.764-9.763-25.592-9.763-35.355 0L257 501.645 139.678 384.322c-9.764-9.763-25.592-9.763-35.355 0L11 477.645V256c0-8.271 6.729-15 15-15"></path><path d="M293 401c27.57 0 50-22.43 50-50s-22.43-50-50-50-50 22.43-50 50 22.43 50 50 50">
      </path></svg>`,
  },
]);

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
</script>

<template>
  <div id="search">
    <div class="container relative">
      <div
        class="sticky top-0 z-50 flex items-center text-black rounded bg-[#f7f7f7] h-[56px] px-2"
        style="border: 1px solid #d8d8d8"
      >
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
          <button class="btn" style="padding: 10px; border: none">
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
          <button class="btn" style="padding: 10px; border: none">
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
      <div class="search-layout">
        <div
          class="filter-header sticky top-[56px] z-50 bg-white flex items-center justify-between gap-12"
          style="border-bottom: 1px solid #e5e5e5"
        >
          <div
            class="filter_left py-3 w-[270px] flex items-center justify-between font-semibold"
            style="border-right: 1px solid #e5e5e5"
          >
            <div class="flex items-center gap-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-49 141 512 512"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M413 232H177.7c-10.321-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h35.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-306 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25m306 230H177.7c-10.32-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h35.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-306 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25m306-190h-35.3c-10.32-29.098-38.109-50-70.7-50s-60.379 20.902-70.7 50H1c-13.807 0-25 11.193-25 25s11.193 25 25 25h235.3c10.32 29.098 38.109 50 70.7 50s60.379-20.902 70.7-50H413c13.807 0 25-11.193 25-25s-11.193-25-25-25m-106 50c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25"
                  ></path>
                </svg>
              </span>
              <span>Filters</span>
            </div>
            <button class="flex items-center justify-center w-[40px] h-[40px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M487 0c-13.8 0-25 11.2-25 25v462c0 13.8 11.2 25 25 25s25-11.2 25-25V25c0-13.8-11.2-25-25-25M377 231H85.4l42.2-42.2c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0L7.3 238.3c-9.8 9.8-9.8 25.6 0 35.4l84.9 84.9c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3c9.8-9.8 9.8-25.6 0-35.4L85.4 281H377c13.8 0 25-11.2 25-25s-11.2-25-25-25"
                ></path>
              </svg>
            </button>
          </div>
          <div class="filter_right overflow-hidden flex-1 pe-12">
            <div class="slide__right">
              <swiper
                :modules="[Navigation]"
                :slides-per-view="4"
                :space-between="16"
                navigation
                class="right--swiper"
              >
                <swiper-slide
                  v-for="(slide, index) in slides"
                  :key="index"
                  class="right--swiper-slide"
                >
                  <a href="#" class="block px-6 py-3 rounded-lg border border-gray-300">
                    <div class="flex items-center justify-center gap-2 font-semibold">
                      <span v-html="slide.icon"></span>
                      <p class="text-[14px] whitespace-nowrap">{{ slide.title }}</p>
                    </div>
                  </a>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <div class="filter-detail w-[270px]">
          <div
            class="sticky z-10 top-[120px] overflow-y-auto"
            style="height: calc(100vh - 120px); border-right: 1px solid #e5e5e5"
          >
            <div class="pe-5">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
              <div class="filter-detail__more">
                <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                  <li>
                    <a href="#" class="btn" style="font-weight: 400">Vectors Vectors</a>
                  </li>
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                </ul>
              </div>
            </div>
            <div class="pe-5">
              <button
                type="button"
                class="flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="pe-5">
              <button
                type="button"
                class="flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
              <div>
                <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                  <li>
                    <a href="#" class="btn" style="font-weight: 400">Vectors Vectors</a>
                  </li>
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                </ul>
              </div>
            </div>
            <div class="pe-5">
              <button
                type="button"
                class="flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
              <div>
                <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                  <li>
                    <a href="#" class="btn" style="font-weight: 400">Vectors Vectors</a>
                  </li>
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                </ul>
              </div>
            </div>
            <div class="pe-5">
              <button
                type="button"
                class="flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
              <div>
                <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                  <li>
                    <a href="#" class="btn" style="font-weight: 400">Vectors Vectors</a>
                  </li>
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                </ul>
              </div>
            </div>
            <div class="pe-5">
              <button
                type="button"
                class="flex items-center gap-2 cursor-pointer py-4 font-semibold w-full"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  class="ms-auto"
                >
                  <path
                    d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"
                  ></path>
                </svg>
              </button>
              <div>
                <ul class="flex flex-wrap gap-3 pt-2 pb-6 font-normal">
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                  <li>
                    <a href="#" class="btn" style="font-weight: 400">Vectors Vectors</a>
                  </li>
                  <li><a href="#" class="btn" style="font-weight: 400">Vectors</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="filter-result">
          <div class="sticky z-10 top-[120px] w-full overflow-hidden px-12 mt-4 mb-10">
            <div>
              <p class="text-[22px] text-[#5b5b5b]">
                Showing results for
                <span class="text-[#121212] font-semibold"
                  >Happy Valentine S Day Images</span
                >
                - Page 2
              </p>
            </div>
            <div class="flex items-center justify-between my-5">
              <div class="filter-result__filter flex items-center gap-10">
                <button
                  class="active flex items-center gap-3 cursor-pointer pb-3 text-[14px] font-semibold"
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
                      d="M446.5 36h-283c-35.8 0-65 29.2-65 65v33h-33c-35.8 0-65 29.2-65 65v212c0 35.8 29.2 65 65 65h283c35.8 0 65-29.2 65-65v-33h33c35.8 0 65-29.2 65-65V101c0-35.8-29.2-65-65-65m-283 50h283c8.3 0 15 6.7 15 15v212.5l-55.3-56c-4.7-4.8-11.1-7.4-17.8-7.4s-13.1 2.7-17.8 7.5l-25 25.6-95.3-95.7c-4.7-4.7-11.1-7.4-17.7-7.4s-13 2.6-17.7 7.3l-66.3 66.3V101c-.1-8.3 6.6-15 14.9-15m200 325c0 8.3-6.7 15-15 15h-283c-8.3 0-15-6.7-15-15V199c0-8.3 6.7-15 15-15h33v129.5c0 .8 0 1.5.1 2.3 1.5 34.6 30 62.2 64.9 62.2h200z"
                    ></path>
                    <circle cx="361.5" cy="166" r="30"></circle>
                  </svg>
                  <span>Images</span>
                  <span class="font-normal">300</span>
                </button>
                <button
                  class="flex items-center gap-3 cursor-pointer pb-3 text-[14px] font-semibold"
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
                      d="M388 231H159.253c-6.789-28.635-32.572-50-63.253-50H26c-35.841 0-65 29.159-65 65v302c0 35.841 29.159 65 65 65h362c35.841 0 65-29.159 65-65V296c0-35.841-29.159-65-65-65m-362 0h70c8.271 0 15 6.729 15 15v10c0 13.807 11.193 25 25 25h252c8.271 0 15 6.729 15 15v25H11v-75c0-8.271 6.729-15 15-15m362 332H26c-8.271 0-15-6.729-15-15V371h392v177c0 8.271-6.729 15-15 15"
                    ></path>
                  </svg>
                  <span>Collections</span>
                  <span class="font-normal">10</span>
                </button>
              </div>
              <div
                class="filter-result__sort relative flex items-center gap-2 text-[14px]"
              >
                <span class="text-[#777]">Sort by:</span>
                <button class="flex items-center gap-2 font-semibold">
                  <span>Most relevant</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      d="M363.9 204c-3.9-9.3-13-15.4-23.1-15.4H171.1c-10.1 0-19.2 6.1-23.1 15.4s-1.7 20.1 5.4 27.2l84.9 84.9c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l84.9-84.9c7.1-7.1 9.2-17.9 5.3-27.2"
                    ></path>
                  </svg>
                </button>
                <div class="dropdown hidden">
                  <ul>
                    <li class="flex items-center gap-2 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
                        />
                      </svg>
                      Most relevant
                    </li>
                    <li class="flex items-center gap-2 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
                        />
                      </svg>
                      Relevant
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- result -->
            <div class="filter-result__product gap-6">
              <div class="flex flex-col gap-6">
                <!-- item -->
                <div class="filter-result__item relative rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/gradient-valentine-s-day-background_52683-80623.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
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
                      <button
                        class="btn justify-center bg-white w-[35px] h-[35px]"
                        style="color: #333; padding: 4px"
                        title="Add to collection"
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
                          />
                          <path
                            d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
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
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentine-s-day-illustration_52683-78996.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/gradient-valentine-s-day-background_52683-80623.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentine-s-day-illustration_52683-78996.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/gradient-valentine-s-day-background_52683-80623.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentine-s-day-illustration_52683-78996.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-illustration-valentines-day-celebration_23-2151161160.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentines-day-celebration-background_23-2150010230.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/flat-valentine-s-day-background_23-2149253327.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-illustration-valentines-day-celebration_23-2151161160.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentines-day-celebration-background_23-2150010230.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/flat-valentine-s-day-background_23-2149253327.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-illustration-valentines-day-celebration_23-2151161160.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/realistic-valentines-day-celebration-background_23-2150010230.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/flat-valentine-s-day-background_23-2149253327.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/gradient-valentine-s-day-illustration_23-2149226315.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/realistic-valentine-s-day-youtube-thumbnail_23-2149252158.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/gradient-valentine-s-day-illustration_23-2149226315.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/realistic-valentine-s-day-youtube-thumbnail_23-2149252158.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/gradient-valentine-s-day-illustration_23-2149226315.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/free-vector/realistic-valentine-s-day-youtube-thumbnail_23-2149252158.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/flat-valentines-day-background_23-2149997096.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-psd/flowers-valentines-day-with-mock-up_23-2148373257.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/flat-valentines-day-background_23-2149997096.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-psd/flowers-valentines-day-with-mock-up_23-2148373257.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-vector/flat-valentines-day-background_23-2149997096.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
                <!-- item -->
                <div class="rounded-lg overflow-hidden">
                  <a href="#">
                    <img
                      src="https://img.freepik.com/premium-psd/flowers-valentines-day-with-mock-up_23-2148373257.jpg?ga=GA1.1.1371173213.1736611469&semt=ais_authors_boost"
                    />
                  </a>
                </div>
              </div>
            </div>
            <!-- bottom pagination -->
            <div class="filter-result__bottom flex items-center justify-between mt-8">
              <div class="w-[150px]"></div>
              <div class="filter-result__bottom--actions flex items-center gap-3">
                <button class="btn">
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
                <button class="btn bg-[#336aea]" style="color: #fff">
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
                <span>Page</span>
                <input
                  class="w-[60px] rounded-xl px-2 py-1"
                  style="border: 1px solid #e5e5e5"
                  type="number"
                  value="1"
                />
                <span>of 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
