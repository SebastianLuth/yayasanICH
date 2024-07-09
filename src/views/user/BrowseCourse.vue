<template>
  <div id="dashboard-user">
    <div class="content1" v-if="purchasedModules && user">
      <div class="container p-3">
        <h2 style="color: white ; font-weight:600 ;">Selamat Datang {{ user.full_name  }}</h2>
        <p style="color: white;">Semoga Aktivitas Belajarmu Menyenangkan Yah... Semangat Trus</p>
        <div class="card">
          <div class="card-body">Status Langganan</div>
          <div class="card ms-3 me-3 mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <p>Kamu sudah memiliki {{purchasedModules.length}} Course Yang telah dibeli</p>
                
                <router-link :to="{ name: 'academy' }" id="about-link">
                  <button type="button" class="btn btn-primary">Belajar Sekarang</button>
              </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container text-center p-5">
      <h4>Cari course yang ingin kamu pelajari disini</h4>
      <p>Lebih dari 250+ course yang dapat kamu pelajari disini</p>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>

    <div class="container mb-5">
      <div class="content2 d-flex justify-content-between">
        <h4>Semua Teknologi</h4>
        <div class="p-1">
          <a href="#" class="text-black text-decoration-none me-5">Semua</a>
          <a href="#" class="text-black text-decoration-none me-5">Layanan</a>
          <a href="#" class="text-black text-decoration-none">Web Developer</a>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <productItems
          v-for="product in products"
          :key="product.id"
          :product="product"
        >
        </productItems>
      </div>
    </div>
  </div>
</template>

<script>
import productItems from "../../components/ProductItems.vue";
import axios from "axios";
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const purchasedModules = ref([]);
    const user = ref(null);


    const fetchPurchasedModules = async () => {
      const data = await authStore.getPurchasedModules();
      purchasedModules.value = data;
    };

    const getUser = async () => {
      await authStore.getUser();
      user.value = authStore.userDetail;
    };

    onMounted(async () => {
      await fetchPurchasedModules();
      await getUser();
    });

    return { purchasedModules, user };
  },
  components: {
    productItems,
  },
  data() {
    return {
      products: [],
      consultations: [],
    };
  },
  async created() {
    try {
      const result = await axios.get("https://api-yayasan-ich.vercel.app/api/products");
      const result2 = await axios.get("https://api-yayasan-ich.vercel.app/api/consultation");
      this.products = result.data;
      this.consultations = result2.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
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
.content1 {
  background-image: url("../../assets/img/6903340.jpg");
  height: 300px;
}
</style>
