<template>
  <div id="user" class="d-flex justify-content-center align-items-center bg-custom mt-5 mb-5">
    <div class="container">
      <Suspense>
        <template #default>
          <div v-if="user" class="card card-body mt-4 ">
            <div class="d-flex">
              <img src="../../assets/img/profil_icon.png" width="15%" class="img-fluid me-5" />
              <div class="">
                <h2 class="card-subtitle mb-2 text-muted">
                  {{ user.full_name }}
                </h2>
                <h5 class="card-title">Username: {{ user.username }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  Email: {{ user.email }}
                </h6>                
                <h6 class="card-subtitle mb-2 text-muted">
                  Bergabung Sejak {{ formatYear(user.joinedAt) }}
                </h6>
              </div>
            </div>
          </div>
        </template>

        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const user = ref(null);

    const getUser = async () => {
      await authStore.getUser();
      user.value = authStore.userDetail;
    };

    onMounted(async () => {
      await getUser();
    });

    const formatYear = (dateString) => {
      const date = new Date(dateString);
      return date.getFullYear();
    };

    return { user,formatYear };
  },
};
</script>

<style>
#user{
  height: 300px;
}
.bg-custom{
  background-color: rgb(120, 120, 120) ;
}
</style>
<style scoped>
h1,h2,h3,h4,h5,h6 {
  font-family: "Poppins", sans-serif;
}
p, a{
  font-family: "Quicksand";
}
</style>