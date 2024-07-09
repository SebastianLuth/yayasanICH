<template>
  <div v-if="isAuthenticated" class="col">
    <div class="card h-100">
      <img
        :src="`${product.imageUrl}`"
        class="card-img-top"
        alt="Gambar Product"
        height="250"
      />
      <div class="card-body">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-star me-1" style="font-size: 15px"></i>
            <p class="text-white mb-0 me-2">{{ product.averageRating }}</p>
          </div>
        <h5 class="card-title">{{ product.name }}</h5>
      </div>
      <div class="card-footer d-flex justify-content-between">
          <button
          @click="addToCart(product.code, 1)"
          class="btn btn-selengkapnya bg-custom"
          >
            <p class="text-white mb-0 me-2">Tambahkan ke Keranjang</p>
          </button>
        <div>
          <i
            class="fa-solid fa-dollar-sign text-black"
            style="font-size: 15px"
            >{{ product.price }}</i
          >
        </div>
      </div>
    </div>
  </div>

  <div v-else class="col">
    <div class="card h-100">
      <img
        :src="`${product.imageUrl}`"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <button class="btn no-hover mb-2 bg-custom2">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-star me-1" style="font-size: 15px"></i>
            <p class="text-white mb-0 me-2">{{ product.averageRating }}</p>
          </div>
        </button>
        <h5 class="card-title">{{ product.name }}</h5>
        <p>{{ product.description }}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <router-link
          :to="{ name: 'detail-class', params: { name: product.name } }"
        >
          <button class="btn btn-selengkapnya bg-custom">
            <p class="text-white mb-0 me-2">Detail Product</p>
          </button>
        </router-link>
        <div>
          <i
            class="fa-solid fa-dollar-sign text-black"
            style="font-size: 15px"
            >{{ product.price }}</i
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

export default {
  props: ["product"],
  setup() {
    const authStore = useAuthStore();
    const cart_items = ref([]);

    const addToCart = async(code, quantity) => {
      try {
        await authStore.addToCart({code, quantity});
      } catch (error) {
        console.error("Failed to remove item from cart:", error.message);
      }
    };    
    return { cart_items, addToCart, };
  },
  computed: {
    isAuthenticated: function () {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background: #49a0ec;
}
.bg-custom2 {
  background: #2a9d3d;
}
.fa-star {
  color: white;
}
.no-hover {
  pointer-events: none;
}
</style>
