<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4"
  >
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      <div class="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2l4 -4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công!</h1>
      <p class="text-gray-600 mb-6">
        Cảm ơn bạn đã sử dụng dịch vụ. Đơn hàng của bạn đã được ghi nhận.
      </p>
      <button
        @click="goHome"
        class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
      >
        Quay lại trang chủ
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const query = ref();

const init = async () => {
  query.value = getQueryParamsFromCurrentUrl();
  if (query.value?.is_premium) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.is_premium = true;
    localStorage.setItem("user", JSON.stringify(user));
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

onMounted(() => {
  init();
});

const goHome = () => {
  window.location.href = "/";
};
</script>
