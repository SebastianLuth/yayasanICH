<template>
  <div>
    <h1>Tambah Article</h1>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="judul" class="form-label">Judul:</label>
        <input type="text" v-model="news.judul" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="short_description" class="form-label"
          >Deskripsi Singkat:</label
        >
        <textarea
          v-model="news.short_description"
          class="form-control"
          rows="2"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="konten" class="form-label">Konten:</label>
        <textarea
          v-model="news.konten"
          class="form-control"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="tanggal_dibuat" class="form-label">Tanggal Dibuat:</label>
        <input
          type="date"
          v-model="news.tanggal_dibuat"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="image_one" class="form-label">Upload Gambar 1:</label>
        <input
          class="form-control"
          type="file"
          @change="handleFileUpload"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
  
  <script>
import { useAuthStore } from "../../stores/auth";
import { ref } from "vue";

export default {
  name: "AddNews",
  setup() {
    const authStore = useAuthStore();
    const news = ref({
      judul: "",
      short_description: "",
      konten: "",
      tanggal_dibuat: "",
    });

    const file = ref(null);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const submitForm = async () => {
      try {
        const formData = new FormData();
        formData.append("judul", news.value.judul);
        formData.append("short_description", news.value.short_description);
        formData.append("konten", news.value.konten);
        formData.append("tanggal_dibuat", news.value.tanggal_dibuat);
        formData.append('image', file.value);

        await authStore.addNews(formData);
        alert("News added successfully");
        location.reload();
      } catch (error) {
        alert("Failed to add news: " + error);
      }
    };

    return {
      news,
      handleFileUpload,
      submitForm,
    };
  },
};
</script>
  