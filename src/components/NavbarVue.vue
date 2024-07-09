<template>
  <div v-if="adminNavbar" id="nav-bar admin">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">DASHBOARD</a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <form class="d-flex" role="search">
            <button @click="logout" class="btn btn-outline-success" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <div v-else-if="!hideNavbar" id="nav-bar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <router-link :to="{ name: 'home' }" id="home-link">
            <img
              src="../assets/img/logo-brand.png"
              alt="Bootstrap"
              height="70"
            />
          </router-link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          v-if="isAuthenticated"
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'browse' }" id="home-link">
                <a class="nav-link" aria-current="page" style="text-decoration: none;">Home</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'academy' }" id="about-link">
                <a class="nav-link" aria-current="page" style="text-decoration: none;">Academy</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'cart' }" id="class-link">
                <a class="nav-link" aria-current="page" style="text-decoration: none;">Keranjang</a>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user.username }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link :to="{ name: 'user' }" class="dropdown-item"
                    >Profile</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button @click="logout" class="dropdown-item btn btn-danger">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" id="home-link">
                <a class="nav-link" aria-current="page">Home</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" id="about-link">
                <a class="nav-link" aria-current="page">About</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'contact' }" id="class-link">
                <a class="nav-link" aria-current="page">Contact</a>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kelas
              </a>
              <ul class="dropdown-menu">
                <li v-for="product in products" :key="product">
                  <router-link
                    :to="{
                      name: 'detail-class',
                      params: { name: product.name },
                    }"
                    class="dropdown-item"
                    >{{ product.name }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Konsultation
              </a>
              <ul class="dropdown-menu">
                <li v-for="consultation in consultations" :key="consultation">
                  <router-link
                    :to="{
                      name: 'detail-consultation',
                      params: { name: consultation.name },
                    }"
                    class="dropdown-item"
                    >{{ consultation.name }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'news' }" id="class-link">
                <a class="nav-link" aria-current="page">Berita</a>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <form class="d-flex ms-auto" role="search">
              <router-link :to="{ name: 'login' }" id="class-link">
                <button class="btn btn-outline-success me-4">Masuk</button>
              </router-link>
              <router-link :to="{ name: 'register' }" id="class-link">
                <button class="btn btn-outline-success">Daftar</button>
              </router-link>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      products: [],
      consultations: [],
    };
  },
  computed: {
    user: function () {
      const authStore = useAuthStore();
      return authStore.user;
    },
    isAuthenticated: function () {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
    hideNavbar: function () {
      return (
        this.$route.name === "myModule" || /^\/module\//.test(this.$route.path)
      );
    },
    adminNavbar: function () {
      const authStore = useAuthStore();
      return authStore.AdminAuthenticated;
    },
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
  watch: {
    $route() {
      // This will re-compute hideNavbar whenever the route changes
      this.hideNavbar;
    },
  },
  methods: {
    async logout() {
      try {
        const authStore = useAuthStore();
        await authStore.logout();

        this.$router.replace({ name: "home" });
      } catch (error) {
        // Tangani error jika login gagal
        console.error("Logout failed:");
      }
    },
  },
};
</script>


<style>
</style>
