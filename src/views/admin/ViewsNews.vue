<template>
    <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <h1 style="text-align: start" class="mb-3">Semua Berita</h1>
      <button class="btn btn-primary mb-3">
          <router-link 
          :to="{ name: 'post-article' }" 
          id="about-link"
          class="text-white text-decoration-none"
          >
              Tambahkan Berita
          </router-link>
      </button>
      <div v-if="viewsNews.length > 0" class="row">
        <div class="container">
          <div style="overflow-x: auto">
            <table class="table table-striped" style="width: 250%">
              <thead>
                <tr>
                  <th>ID News</th>
                  <th>Judul News</th>
                  <th>Deskripsi Singkat</th>
                  <th>Konten</th>
                  <th>Tanggal Berita Dibuat</th>
                  <th>Gambar </th>
                  <th>Hapus</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="news in viewsNews"
                  :key="news.id"
                >
                  <td v-if="news.id">
                    <span class="avatar"
                      ><i class="fas fa-user"></i>
                      {{ news.id }}
                    </span>
                  </td>
                  <td v-if="news.judul">{{ news.judul }}</td>
                  <td v-if="news.short_description">{{ news.short_description }}</td>
                  <td v-if="news.konten" width="700">
                    {{ truncatedDescription(news.konten) }}
                  </td>
                  <td v-if="news.tanggal_dibuat">
                    {{ formatDate(news.tanggal_dibuat) }}
                  </td>
                  <td v-if="news.image_one">
                    <img
                      :src="news.image_one"
                      alt="image"
                      style="width: 100px; height: 100px"
                    />
                  </td>
                  <td>
                    <button 
                    type="button" 
                    class="btn btn-danger btn-sm px-3"
                    @click="confirmRemoveNews(news.id)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                  <td>
                    <button 
                    type="button" 
                    class="btn btn-primary btn-sm px-3"
                    @click="editNews(news.id)"
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
  </template>
  <script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useAuthStore } from "../../stores/auth";
import router from '@/router';
  export default {
    name: "ViewsNews",
    setup(){
         const authStore = useAuthStore();
         const viewsNews = ref([]);

         const editNews = (newsId) => {
            router.push(`/admin/news/${newsId}`);
        };
         const fetchgetViewsAll = async () => {
           try {
            const data = await authStore.viewsAllNews();
            viewsNews.value = data.news;
            console.log(data);
           } catch (error) {
            console.log(error)
           }
         };

         const removeNews = async (newsId) => {
           try {
            await authStore.removeNews(newsId);
            alert("Berita Berhasil di Hapus");
            location.reload();
           } catch (error) {
            console.log(error)
           }
         };

         const confirmRemoveNews = async (newsId) => {
      if (confirm("Apakah Anda yakin ingin menghapus Berita ini?")) {
        await removeNews(newsId);
      }
    };

         const truncatedDescription = (description) => {
           return description.length > 100 ? description.substring(0, 200) + '......' : description;
         };

         const formatDate = (date) => {
            const options = { year: "numeric", month: "long", day: "numeric" };
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
                return "Invalid Date"; // Menangani tanggal yang tidak valid
                }
                return parsedDate.toLocaleDateString("id-ID", options);
            };
        
         onMounted(async () => {
            await fetchgetViewsAll();
        });

         return{
            viewsNews,
            truncatedDescription,
            formatDate,
            editNews,
            confirmRemoveNews
         }
    }
  }
</script>
<style></style>
