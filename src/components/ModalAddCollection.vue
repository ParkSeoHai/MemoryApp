<script setup>
import { onMounted, ref, toRef } from "vue";
import { handleErrorAPI } from "../utils";
import { URL_API } from "../constant";
import api from "../utils";
import _ from "lodash";
import { toast } from "vue3-toastify";

const props = defineProps(["data"]);
const emit = defineEmits(["closeModal"]);

const data = toRef(props.data?.item);
const myCollections = ref([]);
const collectionIdsActive = ref([]);

const loading = ref(false);

const collectionAddInput = ref("");

const getMyCollections = async () => {
  try {
    loading.value = true;
    const response = await api.get(`${URL_API}/collection/user`);
    if (response.status !== 200) {
      throw new Error("Có lỗi xảy ra trong quá trình lấy danh sách bộ sưu tập của bạn");
    }
    myCollections.value = response.data?.data || [];
    collectionIdsActive.value = myCollections.value
      .filter((item) =>
        item.resources.some((resource) => resource.resource_id === data.value.id)
      )
      .map((item) => item.id);
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const handleClickCollection = (collection) => {
  if (collectionIdsActive.value.includes(collection.id)) {
    collectionIdsActive.value = collectionIdsActive.value.filter(
      (id) => id !== collection.id
    );
  } else {
    collectionIdsActive.value.push(collection.id);
  }
};

const handleChangeCollection = async () => {
  try {
    // if (collectionIdsActive.value.length === 0) {
    //   toast.info("Vui lòng chọn bộ sưu tập trước khi thêm");
    //   return;
    // }
    const response = await api.post(`${URL_API}/collection/change-resource`, {
      collectionIds: collectionIdsActive.value,
      resourceId: data.value.id,
    });
    if (response.status !== 200) {
      throw new Error("Có lỗi xảy ra trong quá trình thêm vào bộ sưu tập");
    }
    // if (response.data?.statusCode !== 200) {
    //   throw new Error(
    //     response.data?.message || "Có lỗi xảy ra trong quá trình thêm vào bộ sưu tập"
    //   );
    // }
    toast.success(response.data?.message || "Thay đổi tài nguyên bộ sưu tập thành công");
  } catch (error) {
    handleErrorAPI(error);
  }
};

const handleAddCollection = async () => {
  try {
    if (!collectionAddInput.value) {
      toast.info("Vui lòng nhập tên bộ sưu tập");
      return;
    }
    const response = await api.post(`${URL_API}/collection`, {
      name: collectionAddInput.value,
    });
    if (response.status !== 201) {
      throw new Error("Có lỗi xảy ra trong quá trình thêm bộ sưu tập");
    }
    toast.success(response.data?.message || "Thêm bộ sưu tập thành công");
    collectionAddInput.value = "";
    await getMyCollections();
  } catch (error) {
    handleErrorAPI(error);
  }
};

onMounted(async () => {
  await getMyCollections();
});
</script>

<template>
  <div
    class="relative z-999 modal-detail modal-collection"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 transition-opacity"
      aria-hidden="true"
      style="background-color: rgba(10, 21, 47, 0.9)"
      @click="showModalCollection = false"
    ></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-4 max-w-[768px] overflow-y-auto"
          @click.stop=""
        >
          <div class="relative flex">
            <!-- left -->
            <div class="w-[300px]">
              <div class="flex items-center h-full">
                <img :src="data.file_url" :alt="data.name" />
              </div>
            </div>
            <!-- right -->
            <div class="p-[25px] pt-[30px] w-[470px] min-h-[470px]">
              <div class="flex flex-col h-full">
                <p class="font-bold text-[20px] mb-[15px] text-[#424242]">
                  Add to collection
                </p>
                <div class="max-h-[262px] flex-1 overflow-y-auto mb-5">
                  <div v-if="!loading" class="mb-[20px] w-full list-collection">
                    <template v-if="myCollections.length > 0">
                      <button
                        v-for="(collection, index) in myCollections"
                        :key="index"
                        class="collection-item text-[#424242] flex justify-between gap-3 py-[12px] ps-0 pe-[15px] w-full"
                        :class="{
                          active: _.includes(collectionIdsActive, collection.id),
                        }"
                        style="border-bottom: 1px solid #b0b0b080"
                        @click="handleClickCollection(collection)"
                      >
                        <span class="font-bold text-[15px]">{{ collection?.name }}</span>
                        <span
                          v-if="_.includes(collectionIdsActive, collection.id)"
                          class="collection-status hidden items-center gap-2 text-[#c8c8c8] text-[14px]"
                        >
                          Select
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-49 141 512 512"
                            width="16"
                            height="16"
                            aria-hidden="true"
                            fill="currentColor"
                          >
                            <path
                              d="M127 552.25a24.92 24.92 0 0 1-17.678-7.322l-101-101c-9.763-9.763-9.763-25.593 0-35.355 9.764-9.764 25.592-9.764 35.355 0l83.339 83.34 243.323-242.857c9.771-9.754 25.602-9.74 35.355.033 9.754 9.772 9.739 25.602-.033 35.355l-261 260.5A24.92 24.92 0 0 1 127 552.25"
                            ></path>
                          </svg>
                        </span>
                        <span
                          v-else
                          class="collection-status hidden items-center gap-2 text-[#c8c8c8] text-[14px]"
                        >
                          Remove
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-49 141 512 512"
                            width="16"
                            height="16"
                            aria-hidden="true"
                            fill="currentColor"
                          >
                            <path
                              d="m242.355 397 127.987-127.987c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L207 361.644 79.013 233.658c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355l127.986 127.986L43.658 524.986c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l127.986-127.986 127.987 127.987c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
                            ></path>
                          </svg>
                        </span>
                        <span
                          v-if="_.includes(collectionIdsActive, collection.id)"
                          class="collection-status-selected"
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
                              d="M127 552.25a24.92 24.92 0 0 1-17.678-7.322l-101-101c-9.763-9.763-9.763-25.593 0-35.355 9.764-9.764 25.592-9.764 35.355 0l83.339 83.34 243.323-242.857c9.771-9.754 25.602-9.74 35.355.033 9.754 9.772 9.739 25.602-.033 35.355l-261 260.5A24.92 24.92 0 0 1 127 552.25"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </template>
                    <template v-else>
                      <div class="text-center text-[#424242] text-[16px] font-semibold">
                        Bạn chưa có bộ sưu tập nào
                      </div>
                    </template>
                  </div>
                </div>
                <div class="flex items-center">
                  <input
                    type="text"
                    placeholder="Create a new collection"
                    class="border border-[#b1b1b1] p-2 outline-none flex-1"
                    v-model.trim="collectionAddInput"
                    @keyup.enter="handleAddCollection"
                  />
                  <button
                    type="button"
                    class="btn"
                    style="
                      border-radius: 0;
                      font-size: 16px;
                      border: 2px solid #336aea;
                      color: #336aea;
                      font-weight: 400;
                    "
                    @click="handleAddCollection"
                  >
                    Add collection
                  </button>
                </div>
                <div class="mt-[20px]">
                  <button
                    type="button"
                    class="btn bg-[#336aea] justify-center w-full disabled:opacity-50"
                    style="color: #fff"
                    @click="handleChangeCollection"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
            <button
              class="absolute top-[14px] right-[14px]"
              type="button"
              @click.stop="emit('closeModal')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-49 141 512 512"
                width="20"
                height="20"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="m242.355 397 127.987-127.987c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L207 361.644 79.013 233.658c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355l127.986 127.986L43.658 524.986c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l127.986-127.986 127.987 127.987c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
