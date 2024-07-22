<template>
  <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <h1 style="text-align: start" class="mb-3">Semua Users</h1>
  <div v-if="orders.length > 0" id="admin">
    <div class="container">
      <table class="table table-striped" style="width: 100%">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Purchased Courses</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td v-if="order.userId">
              <span class="avatar"
                ><i class="fas fa-user"></i>
                {{ order.userId.username }}
              </span>
            </td>
            <td v-if="order.userId">{{ order.userId.email }}</td>
            <td v-if="order.userId">
              <ul>
                <li
                  v-for="course in order.userId.purchasedCourses"
                  :key="course.courseId"
                >
                  {{ course.courseId }} - {{ course.courseName }} - <button
                   @click="confirmRemoveUserModule(order.userId._id, course.courseId)" ><i class="bi bi-file-earmark-minus-fill" style="color: red"></i>
                </button>
                </li>
              </ul>
            </td>
            <td v-if="order.userId">
              <button
                type="button"
                class="btn btn-danger btn-sm px-3"
                @click="confirmRemoveUser(order.userId._id)"
              >
                <i class="fas fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>
  
  <script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";

export default {
  components: {},
  setup() {
    const authStore = useAuthStore();
    const user = ref(authStore.userDetail);
    const orders = ref([]);

    const fetchgetOrdersUsers = async () => {
      const data = await authStore.getOrdersUsers();
      orders.value = data;
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    };
    
    const removeUser = async (userId) => {
      try {
        await authStore.removeUser(userId)
        alert("Pengguna berhasil dihapus.");
        location.reload();
      } catch (error) {
        console.error("Failed to remove user:", error.message);
      }
    }
    
    const removeUserModule = async(userId, courseId) => {
      try {
        await authStore.removeModuleUserByAdmin(userId, courseId);
        alert("Module berhasil dihapus.");
        await fetchgetOrdersUsers(); // Refresh the orders list
      } catch (error) {
        console.error("Failed to remove module:", error.message);
        alert("Gagal menghapus module: " + error.message);
      }
    }

    const confirmRemoveUser = async (userId) => {
      if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        removeUser(userId);
      }
    }
    const confirmRemoveUserModule = async (userId, courseId) => {
      if (confirm("Apakah Anda yakin ingin menghapus Modul pengguna ini?")) {
        removeUserModule(userId,courseId);
      }
    }

    onMounted(async () => {
      if (!user.value || user.value.role !== "admin") {
        this.$router.replace({ name: "login" }); // redirect to login page
      }
      await fetchgetOrdersUsers();
      // console.log(fetchgetOrdersUsers());
    });

    return { user, orders, formatDate, removeUser,confirmRemoveUser,confirmRemoveUserModule };
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
