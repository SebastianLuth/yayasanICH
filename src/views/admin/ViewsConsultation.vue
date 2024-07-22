<template>
  <div class="container mt-5">
    <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <h1 style="text-align: start" class="mb-3">Semua Produk Konsultasi</h1>
      <button class="btn btn-primary mb-3">
        <router-link
          :to="{ name: 'post-consultation' }"
          id="about-link"
          class="text-white text-decoration-none"
        >
          Tambahkan Produk
        </router-link>
      </button>
      <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div v-if="viewsConsultation.length > 0" class="row">
          <div class="container">
            <div style="overflow-x: auto">
              <table class="table table-striped" style="width: 250%">
                <thead>
                  <tr>
                    <th>ID Consultation</th>
                    <th>Name</th>
                    <th>header</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th>Consultation Include</th>
                    <th>Image</th>
                    <th>Hapus</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="consultation in viewsConsultation"
                    :key="consultation.id"
                  >
                    <td v-if="consultation.id">
                      <span class="avatar"
                        ><i class="fas fa-user"></i>
                        {{ consultation.id }}
                      </span>
                    </td>
                    <td v-if="consultation.name">{{ consultation.name }}</td>
                    <td v-if="consultation.header">
                      {{ consultation.header }}
                    </td>
                    <td v-if="consultation.description" width="700">
                      {{ truncatedDescription(consultation.description) }}
                    </td>
                    <td v-if="consultation.averageRating">
                      {{ consultation.averageRating }}
                    </td>
                    <td v-if="consultation.consultationInclude">
                      <ul>
                        <li
                          v-for="(
                            Include, index
                          ) in consultation.consultationInclude"
                          :key="index"
                        >
                          {{ Include }}
                        </li>
                      </ul>
                    </td>
                    <td v-if="consultation.imageUrl">
                      <img
                        :src="consultation.imageUrl"
                        alt="image"
                        style="width: 100px; height: 100px"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm px-3"
                        @click="confirmRemoveConsultation(consultation.id)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm px-3"
                        @click="editConsultation(consultation.id)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";
import router from "@/router";
export default {
  name: "ViewsConsultation",
  setup() {
    const authStore = useAuthStore();
    const viewsConsultation = ref([]);
    const truncatedDescription = (description) => {
      return description.length > 100
        ? description.substring(0, 200) + "......"
        : description;
    };
    const editConsultation = (consultationId) => {
      router.push(`/admin/consultation/${consultationId}`);
    };
    const fetchgetViewsAllConsultation = async () => {
      try {
        const data = await authStore.viewsAllConsultation();
        viewsConsultation.value = data.consultation;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    const removeConsultation = async (consultationId) => {
      try {
        // console.log(productId)
        await authStore.removeConsultation(consultationId);
        alert("Product consultation berhasil dihapus.");
        location.reload();
      } catch (error) {
        // console.error("Failed to remove Module:", error.message);
      }
    };

    const confirmRemoveConsultation = async (consultationId) => {
      if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        await removeConsultation(consultationId);
      }
    };

    onMounted(async () => {
      await fetchgetViewsAllConsultation();
    });
    return {
      viewsConsultation,
      truncatedDescription,
      confirmRemoveConsultation,
      editConsultation,
    };
  },
};
</script>

<style></style>
