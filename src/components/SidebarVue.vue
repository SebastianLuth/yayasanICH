<template>
    <aside v-if="adminSidebar" :class="{'is-expanded': is_expanded}">
      <div class="logo">
        <img src="../assets/img/logo-brand.png" alt="Vue" />
      </div>
  
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="toggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>
  
      <h3>Menu</h3>
      <div class="menu">
        <router-link to="/admin" class="button">
          <span class="material-icons">home</span>
          <span class="text">Home</span>
        </router-link>
        <router-link to="/admin/AllModulProduct" class="button">
          <span class="material-icons">library_books</span>
          <span class="text">E-Course  & Modul</span>
        </router-link>        
        <router-link to="/admin/addProduct" class="button">
          <span class="material-icons">inventory</span>
          <span class="text">Tambah Produk</span>
        </router-link>
        <router-link to="/admin/addModule" class="button">
          <span class="material-icons">menu_book</span>
          <span class="text">Tambah Modul</span>
        </router-link>
        <router-link to="/admin/AllNews" class="button">
          <span class="material-icons">newspaper</span>
          <span class="text"> Berita</span>
        </router-link>
        <router-link to="/admin/AllConsultation" class="button">
          <span class="material-icons">support_agent</span>
          <span class="text">Konsultasi</span>
        </router-link>
      </div>
  
      <div class="flex"></div>
    </aside>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useAuthStore } from "@/stores/auth";
  
  export default {
    setup() {
      const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
      const authStore = useAuthStore();
  
      const adminSidebar = computed(() => authStore.AdminAuthenticated);
  
      const toggleMenu = () => {
        is_expanded.value = !is_expanded.value;
        localStorage.setItem("is_expanded", is_expanded.value);
      };
  
      return { is_expanded, adminSidebar, toggleMenu };
    }
  };
  </script>
  
  <style lang="scss" scoped>
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
  
