<template>
  <div class="container post-product">
    <h1>Edit Produk E-Course</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="code" class="form-label">Code untuk Product:</label>
        <input type="text" class="form-control" v-model="product.code" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Nama Dari Product:</label>
        <input type="text" class="form-control" v-model="product.name" required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Harga Dari Product:</label>
        <input type="text" class="form-control" v-model="product.price" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Deskripsi singkat dari product:</label>
        <textarea v-model="product.description" class="form-control" rows="4" required></textarea>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Deskripsi Lengkap dari product:</label>
        <textarea v-model="product.longDescription" class="form-control" rows="4" required></textarea>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Upload Image</label>
        <input class="form-control" type="file" @change="handleFileUpload" required />
      </div>
      <div class="mb-3">
        <label for="averageRating" class="form-label">Ratings Rata-Rata:</label>
        <input type="number" step="0.1" max="5" v-model.number="product.averageRating" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="videoUrl" class="form-label">Video URL:</label>
        <input type="text" class="form-control" v-model="product.videoUrl" />
      </div>
      <div class="mb-3">
        <label for="willLearn" class="form-label">Will Learn (comma separated):</label>
        <input type="text" v-model="willLearnInput" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="materialInclude" class="form-label">Material Include (comma separated):</label>
        <input type="text" v-model="materialIncludeInput" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="targetAudience" class="form-label">Target Audience (comma separated):</label>
        <input type="text" v-model="targetAudienceInput" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="modules" class="form-label">Modules ID:</label>
        <input type="text" v-model="modulesInput" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'EditProduct',
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;
    console.log(productId);
    const product = ref({
      code: '',
      name: '',
      price: '',
      description: '',
      longDescription: '',
      averageRating: null,
      videoUrl: '',
      willLearn: [],
      materialInclude: [],
      targetAudience: [],
      modules: [],
    });
    const willLearnInput = ref('');
    const materialIncludeInput = ref('');
    const targetAudienceInput = ref('');
    const modulesInput = ref('');
    const file = ref(null);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('code', product.value.code);
      formData.append('name', product.value.name);
      formData.append('price', product.value.price);
      formData.append('description', product.value.description);
      formData.append('longDescription', product.value.longDescription);
      formData.append('image', file.value);
      formData.append('averageRating', product.value.averageRating);
      formData.append('videoUrl', product.value.videoUrl);
      formData.append('willLearn', JSON.stringify(willLearnInput.value.split(',')));
      formData.append('materialInclude', JSON.stringify(materialIncludeInput.value.split(',')));
      formData.append('targetAudience', JSON.stringify(targetAudienceInput.value.split(',')));
      formData.append('modules', JSON.stringify(modulesInput.value.split(',')));

      try {
        await authStore.updateProduct(productId,formData);
        alert('Product Update successfully');
        router.push('/admin/AllModulProduct');
      } catch (error) {
        console.error(error);
        alert('Failed to update product');
      }
    };

    return {
      product,
      willLearnInput,
      materialIncludeInput,
      targetAudienceInput,
      modulesInput,
      handleFileUpload,
      submitForm,
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
