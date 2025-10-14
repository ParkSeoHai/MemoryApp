<template>
  <div class="max-w-7xl mx-auto py-16 px-6">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold">Pick your way to create</h1>
      <p class="mt-3 text-sm text-gray-500">
        Trusted by 700,000+ creative teams, marketers, and designers
      </p>
    </div>

    <!-- <div class="flex items-center justify-center gap-6 mb-8">
      <div class="ml-6 flex items-center gap-3">
        <label class="text-sm text-gray-600">How many users?</label>
        <div class="flex items-center border rounded-md overflow-hidden">
          <button class="px-3 py-1" @click="decrease">-</button>
          <div class="px-4">{{ users }}</div>
          <button class="px-3 py-1" @click="increase">+</button>
        </div>
        <span class="text-sm text-gray-500">user</span>
      </div>
    </div> -->

    <!-- Pricing cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="plan in plans" :key="plan.id" :class="cardClass(plan)">
        <div class="p-6 flex flex-col h-full">
          <div class="mb-4">
            <h3 class="text-xl font-semibold">{{ plan.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ plan.subtitle }}</p>
          </div>

          <div class="mt-auto">
            <div class="mb-4">
              <div class="text-xs text-gray-400 line-through" v-if="billing === 'annual'">
                {{ formatPrice(plan.basePrice) }} VND
              </div>
              <div class="flex items-baseline gap-2">
                <div class="text-3xl font-extrabold">{{ displayPrice(plan) }}</div>
                <div class="text-sm text-gray-500">/{{ plan.monthCount }} month</div>
              </div>
              <div class="text-sm text-gray-600 mt-1" v-if="billing === 'annual'">
                40% off billed annually
              </div>
            </div>

            <button v-if="!user?.is_premium" :class="buttonClass(plan)" class="w-full py-2 rounded-md mb-4"
              @click="openModal(plan)">
              {{ plan.cta }}
            </button>
            <div v-else class="w-full py-2 rounded-md mb-4 bg-gray-100 text-gray-500 text-center border">
              Bạn đã có gói Premium
            </div>

            <PaymentModal :show="showModal" :plan="selectedPlan" @close="showModal = false" />

            <ul class="text-sm text-gray-600 space-y-2">
              <li v-for="(line, i) in plan.features" :key="i" class="flex items-start gap-2">
                <svg class="w-4 h-4 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ line }}</span>
              </li>
            </ul>

            <div class="text-xs text-gray-400 mt-4">
              Stock content: <span class="text-gray-600">{{ plan.stock }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PaymentModal from "../components/PaymentModal.vue";

const showModal = ref(false);
const selectedPlan = ref(null);
const user = ref(null);

function openModal(plan) {
  selectedPlan.value = plan;
  showModal.value = true;
}

const billing = ref("monthly"); // 'monthly' | 'annual'
const users = ref(1);

function toggleBilling() {
  billing.value = billing.value === "monthly" ? "annual" : "monthly";
}
function increase() {
  users.value += 1;
}
function decrease() {
  if (users.value > 1) users.value -= 1;
}

const plans = ref([
  {
    id: "essential",
    title: "Essential",
    subtitle: "Kick off your AI journey with all the basics",
    basePrice: 100000, // monthly MSRP
    cta: "Get Plan",
    features: [
      "84,000 AI credits/year for creating images, videos, audio",
      "Up to 16,800 images or 560 videos a year",
      "Magnific Upscaler (NEW)",
    ],
    stock: "This plan does not include Premium stock content",
    monthCount: 1,
  },
  {
    id: "premium",
    title: "Premium",
    subtitle: "Unlock Premium assets and on-brand visuals",
    basePrice: 600000,
    cta: "Get Plan",
    features: [
      "84,000 AI credits/year for creating images, videos, audio",
      "Up to 16,800 images or 560 videos a year",
      "Magnific Upscaler (NEW)",
    ],
    stock: "Includes Premium stock content",
    monthCount: 6,
  },
  {
    id: "premium_plus",
    title: "Premium+",
    subtitle: "Boost your creativity with full access",
    basePrice: 1200000,
    cta: "Get Plan",
    features: [
      "84,000 AI credits/year for creating images, videos, audio",
      "Up to 16,800 images or 560 videos a year",
      "Magnific Upscaler (NEW)",
    ],
    stock: "Unlimited downloads",
    monthCount: 12,
  },
]);

function formatPrice(v) {
  return v.toLocaleString("de-DE");
}

function displayPrice(plan) {
  const base = plan.basePrice;
  let price;
  if (billing.value === "monthly") {
    price = base * users.value;
  } else {
    // annual billing: 40% off, show monthly equivalent after discount
    price = base * 0.6 * users.value;
  }
  return `${formatPrice(price)} VND`;
}

function cardClass(plan) {
  const isBest = plan.id === "premium_plus";
  return [
    "rounded-lg border p-0 overflow-hidden shadow-sm bg-white",
    isBest ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200",
  ].join(" ");
}

function buttonClass(plan) {
  return plan.id === "premium_plus" ? "bg-blue-600 text-white" : "bg-black text-white";
}

onMounted(() => {
  const userLocal = localStorage.getItem("user");
  if (userLocal && userLocal !== "undefined") {
    user.value = JSON.parse(userLocal);
  }
});
</script>

<style scoped>
/* small tweaks to better match the example */
.card-badge {
  position: absolute;
  top: -10px;
  left: 0;
}
</style>
