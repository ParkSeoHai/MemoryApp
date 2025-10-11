<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
      >
        ✕
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left: Billing info -->
        <div>
          <h2 class="text-2xl font-bold mb-4">Get {{ plan?.title }}</h2>
          <h3 class="font-semibold mb-2">Billing information</h3>

          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium"
                >First name <span class="text-red-500">*</span></label
              >
              <input
                v-model="billing.firstName"
                type="text"
                class="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label class="text-sm font-medium">Country</label>
              <select
                v-model="billing.country"
                class="w-full border rounded-md px-3 py-2 mt-1"
              >
                <option>Vietnam</option>
              </select>
            </div>
          </div>

          <h3 class="font-semibold mt-6 mb-2">Payment method</h3>
          <div class="flex gap-3 mb-4">
            <button
              v-for="method in ['vnpay']"
              :key="method"
              @click="paymentMethod = method"
              :class="[
                'border rounded-md px-4 py-2 flex-1 flex items-center justify-center gap-2',
                paymentMethod === method
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50',
              ]"
            >
              <template v-if="method === 'vnpay'">VNPAY</template>
            </button>
          </div>

          <!-- Nếu chọn card thì hiển thị form nhập thẻ -->
          <!-- <div v-if="paymentMethod === 'vnpay'" class="space-y-3">
            <div>
              <label class="text-sm font-medium">Cardholder</label>
              <input
                v-model="card.name"
                type="text"
                class="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Name on card"
              />
            </div>

            <div>
              <label class="text-sm font-medium">Card number</label>
              <input
                v-model="card.number"
                type="text"
                maxlength="19"
                class="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-medium">Expiration date</label>
                <input
                  v-model="card.expiry"
                  type="text"
                  maxlength="5"
                  class="w-full border rounded-md px-3 py-2 mt-1"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label class="text-sm font-medium">Security code</label>
                <input
                  v-model="card.cvv"
                  type="password"
                  maxlength="4"
                  class="w-full border rounded-md px-3 py-2 mt-1"
                  placeholder="CVV"
                />
              </div>
            </div>

            <div class="text-xs text-gray-500 mt-2">
              🔒 Secure payment with SSL Encryption
            </div>
            <div class="text-xs text-gray-500">
              Having trouble with your payment? Please check
              <a href="#" class="text-blue-600 underline">this article</a>
            </div>
          </div> -->
        </div>

        <!-- Right: Plan info -->
        <div class="border rounded-md p-4 bg-gray-50">
          <h3 class="font-semibold mb-3">Plan info</h3>
          <ul class="text-sm text-gray-700 space-y-1 mb-4">
            <li v-for="(feature, i) in plan?.features" :key="i">✔️ {{ feature }}</li>
          </ul>

          <!-- <div class="flex items-center justify-between mb-3">
            <span>Number of users</span>
            <div class="flex items-center border rounded-md">
              <button @click="decreaseUsers" class="px-3">-</button>
              <span class="px-4">{{ users }}</span>
              <button @click="increaseUsers" class="px-3">+</button>
            </div>
          </div> -->

          <!-- <div class="flex items-center justify-between mb-3">
            <span>Billing</span>
            <button @click="toggleBilling" class="flex items-center gap-2">
              <span>Monthly</span>
              <div class="w-10 h-5 bg-gray-300 rounded-full relative">
                <div
                  :class="[
                    billingCycle === 'annual' ? 'translate-x-5' : 'translate-x-0',
                    'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform',
                  ]"
                ></div>
              </div>
              <span>Annual</span>
            </button>
          </div> -->

          <div class="border-t pt-3 text-right">
            <div class="text-sm text-gray-500 mb-1">15% tax included</div>
            <div class="text-xl font-bold">
              {{ totalPrice?.toLocaleString("vi-VN") + " VND" }}
            </div>
          </div>

          <button
            @click="confirmPay"
            class="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  show: Boolean,
  plan: Object,
});
const emits = defineEmits(["close"]);
import { URL_API } from "../constant";
import api, { handleErrorAPI } from "../utils";
import { toast } from "vue3-toastify";

const paymentMethod = ref("vnpay");

const card = ref({
  name: "",
  number: "",
  expiry: "",
  cvv: "",
});

const billing = ref({
  firstName: "",
  country: "Vietnam",
  isCompany: false,
});
const users = ref(1);
const billingCycle = ref("monthly");

function close() {
  emits("close");
}
function increaseUsers() {
  users.value++;
}
function decreaseUsers() {
  if (users.value > 1) users.value--;
}
function toggleBilling() {
  billingCycle.value = billingCycle.value === "monthly" ? "annual" : "monthly";
}

const totalPrice = computed(() => {
  if (!props.plan) return 0;
  //   const base = props.plan.basePrice * users.value;
  //   const discounted = billingCycle.value === "annual" ? base * 0.6 : base;
  //   const taxed = discounted * 1.15; // 15% tax
  // Format as VND: thousands separator, no decimals
  return props.plan.basePrice;
});

const confirmPay = async () => {
  try {
    if (!billing.value.firstName) {
      toast.error("Please enter your first name.");
      return;
    }

    const { data } = await api.post(`${URL_API}/payment/vnpay`, {
      amount: totalPrice.value, // Tổng số tiền cần thanh toán (đơn vị: VND)
      plan: props.plan?.id, // Gói người dùng chọn
      name: billing.value.firstName || "Khách hàng",
      country: billing.value.country || "Vietnam",
      users: users.value || 1,
      cycle: billingCycle.value || "monthly",
      paymentMethod: paymentMethod.value || "vnpay",
    });

    if (data?.paymentUrl) {
      //   window.open(data.paymentUrl, "VNPAY", "width=1024,height=768");
      window.location.href = data.paymentUrl;
    } else {
      toast.error("Không tạo được link thanh toán VNPAY!");
    }
  } catch (err) {
    console.error("confirmPay error:", err);
    toast.error("Có lỗi xảy ra khi khởi tạo thanh toán!");
  }
};
</script>
