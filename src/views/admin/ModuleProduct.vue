<template>
  <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <h1 style="text-align: start" class="mb-2 mt-3">Semua Module</h1>
    <button class="btn btn-primary mb-3">
        <router-link :to="{ name: 'post-module' }" id="about-link" class="text-white text-decoration-none">
            Tambahkan Modul
        </router-link>
    </button>
    <div v-if="viewsModules.length > 0" class="row">
      <div
        v-for="module in viewsModules"
        :key="module.id"
        class="col-md-4 mb-4"
      >
        <div class="card">
          <div class="card-header d-flex align-items-center border-bottom">
            <span class="avatar text-bg-primary avatar-lg fs-5">R</span>
            <div class="ms-3">
              <h6 class="mb-0 fs-sm">{{ module.judul }}</h6>
              <span class="text-muted fs-sm"
                >{{ module.penulis }},
                {{ formatDate(module.tanggal_dibuat) }}</span
              >
            </div>
            <button
              class="btn text-muted ms-auto"
              type="btn"
              @click="confirmRemoveModul(module.id)"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              class="btn text-primary ms-2"
              @click="editModule(module.id)"
            >
              Edit
            </button>
          </div>
          <div class="card-body" style="height: 250px">
            <h6>Module ID: {{ module.id }}</h6>
            <p>{{ truncatedDescription(module.deskripsi) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <h1 style="text-align: start" class="mb-2 mt-3">Semua Product</h1>
    <button class="btn btn-primary mb-3">
        <router-link :to="{ name: 'post-product' }" id="about-link" class="text-white text-decoration-none">
            Tambahkan Produk
        </router-link>
    </button>
    <div v-if="viewsProducts.length > 0" class="row">
      <div
        v-for="product in viewsProducts"
        :key="product.code"
        class="col-md-4 mb-4"
      >
        <div class="card">
          <div class="card-header d-flex align-items-center border-bottom">
            <span class="avatar text-bg-primary avatar-lg fs-5">R</span>
            <div class="ms-3">
              <h6 class="mb-0 fs-sm">{{ product.name }}</h6>
              <span class="text-muted fs-sm"
                >Target Audience : {{ product.targetAudience[0] }},
              </span>
            </div>
            <button
              class="btn text-muted ms-auto"
              type="btn"
              @click="confirmRemoveProduct(product.id)"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              class="btn text-primary ms-2"
              @click="editProduct(product.id)"
            >
              Edit
            </button>
          </div>
          <div class="card-body" style="height: 250px">
            <p>{{ product.description }}</p>
            <p>Module ID yang digunakan {{ product.modules[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
      <script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {},
  setup() {
    const authStore = useAuthStore();
    const user = ref(authStore.userDetail);
    const viewsModules = ref([]);
    const viewsProducts = ref([]);
    const router = useRouter();

    const fetchgetViewsAll = async () => {
      const data = await authStore.viwesAllModules();
      const modules = data.modules;
      // console.log(modules)
      const products = data.products;
      // console.log(products)
      viewsModules.value = modules;
      viewsProducts.value = products;
    };

    const editModule = (moduleId) => {
      router.push(`/admin/module/${moduleId}`);
    };
    const editProduct = (productId) => {
      router.push(`/admin/product/${productId}`);
    };

    const removeModule = async (modulId) => {
      try {
        // console.log(modulId)
        await authStore.removeModule(modulId);
        alert("Modul berhasil dihapus.");
        location.reload();
      } catch (error) {
        // console.error("Failed to remove Module:", error.message);
      }
    };
    const removeProduct = async (productId) => {
      try {
        // console.log(productId)
        await authStore.removeProduct(productId);
        alert("Product berhasil dihapus.");
        location.reload();
      } catch (error) {
        // console.error("Failed to remove Module:", error.message);
      }
    };

    const confirmRemoveModul = async (modulId) => {
      if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
        removeModule(modulId);
      }
    };
    const confirmRemoveProduct = async (productId) => {
      if (confirm("Apakah Anda yakin ingin menghapus product ini?")) {
        removeProduct(productId);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const truncatedDescription = (description) => {
      return description.length > 100
        ? description.substring(0, 200) + "......"
        : description;
    };

    onMounted(async () => {
      if (!user.value || user.value.role !== "admin") {
        this.$router.replace({ name: "login" }); // redirect to login page
      }

      await fetchgetViewsAll();
    });

    return {
      user,
      editModule,
      editProduct,
      viewsModules,
      formatDate,
      confirmRemoveModul,
      confirmRemoveProduct,
      truncatedDescription,
      viewsProducts,
    };
  },
};
</script>
      
    <style lang="scss">
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
