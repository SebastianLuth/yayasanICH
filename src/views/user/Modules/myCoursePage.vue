<template>
  <div class="container mt-2 mb-5 p-3">
    <h2 class="mb-3"> Course yang dimiliki</h2>
    <div v-if="purchasedModules" class="purchased-products">
      <div
        v-for="course in purchasedModules"
        :key="course.courseId"
        class="card mt-3"
      >
        <div class="card-body">Status Langganan</div>
        <div class="card ms-3 me-3 mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ course.courseName }}</h5>
              <router-link
                :to="{
                  name: 'detail-class',
                  params: { name: course.courseName },
                }"
              >
                <a href="#" class="btn btn-primary">Belajar Sekarang</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mb-5">
    <h2>Selamat Belajar LWDERS</h2>
    <p>Semoga Aktivitas Belajarmu Menyenangkan Yah... Keep It Up &#129299;</p>
  </div>
</template>

<script>
import { useAuthStore } from "../../../stores/auth";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const purchasedModules = ref([]);

    const fetchPurchasedModules = async () => {
      const data = await authStore.getPurchasedModules();
      purchasedModules.value = data;
    };

    onMounted(async () => {
      await fetchPurchasedModules();
    });

    return { purchasedModules };
  },
};
</script>
<style scoped>
h1,h2,h3,h4,h5,h6 {
  font-family: "Poppins", sans-serif;
}
p, a{
  font-family: "Quicksand";
}
</style>
