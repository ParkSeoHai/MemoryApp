<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      <div class="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85L21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14c0 1.054.816 1.918 1.85 1.995L5 21z" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-red-600 mb-2">Thanh toán thất bại!</h1>
      <p class="text-gray-600 mb-6">Rất tiếc, giao dịch của bạn không thành công. Vui lòng thử lại sau.</p>
      <button
        @click="goHome"
        class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
      >
        Quay lại trang chủ
      </button>
    </div>
  </div>
</template>

<script setup>

const goHome = () => {
    window.location.href = "/";
};
</script>
