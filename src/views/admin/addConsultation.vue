<template>
  <div class="container post-product">
    <h1>Tambahkan Produk Konsultasi</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nama Dari Consultasi:</label>
        <input
          type="text"
          class="form-control"
          v-model="consultation.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="header" class="form-label">Header untuk Consultasi:</label>
        <input
          type="text"
          class="form-control"
          v-model="consultation.header"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Deskripsi Konsultasi</label>
        <textarea
          v-model="consultation.description"
          class="form-control"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Upload Image</label>
        <input
          class="form-control"
          type="file"
          @change="handleFileUpload"
          required
        />
      </div>
      <div class="mb-3">
        <label for="averageRating" class="form-label">Ratings Rata-Rata:</label>
        <input
          type="number"
          step="0.1"
          max="5"
          v-model.number="consultation.averageRating"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="consultationInclude" class="form-label"
          >Consultation Include (comma separated):</label
        >
        <input
          type="text"
          v-model="consultationIncludeInput"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
  
  <script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";
import router from '@/router';
export default {
  name: "AddConsultation",
  setup() {
    const authStore = useAuthStore();
    const viewsConsultation = ref([]);
    const consultation = ref({
      name: "",
      description: "",
      header: "",
      averageRating: null,
      consultationInclude: [],
    });
    const consultationIncludeInput = ref("");
    const file = ref(null);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };
    const truncatedDescription = (description) => {
      return description.length > 100 ? description.substring(0, 200) + '......' : description;
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

    const submitForm = async () => {
      const formData = new FormData();
      formData.append("name", consultation.value.name);
      formData.append("header", consultation.value.header);
      formData.append("description", consultation.value.description);
      formData.append("image", file.value);
      formData.append("averageRating", consultation.value.averageRating);
      formData.append(
        "consultationInclude",
        JSON.stringify(consultationIncludeInput.value.split(","))
      );

      try {
        await authStore.addConsultation(formData);
        alert("Product added successfully");
        router.push({ name: "AllConsultation" });
      } catch (error) {
        console.error(error);
        alert("Failed to add product");
      }
    };

    onMounted(async () => {
      await fetchgetViewsAllConsultation();
    });
    return {
      consultation,
      consultationIncludeInput,
      handleFileUpload,
      submitForm,
      viewsConsultation,
      truncatedDescription,
    };
  },
};
</script>
  <style scoped>
.post-product {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"],
input[type="url"],
input[type="date"],
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  display: inline-block;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
