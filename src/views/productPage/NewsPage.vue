<template>
  <div class="container">
    <h2 style="text-align: start">Berita Terbaru</h2>
    <div class="news-container" v-if="viewsAllNews.length > 0">
      <div v-for="news in viewsAllNews" :key="news.id">
        <div class="card" style="width: 18rem">
          <img
            :src="`{news.image_one}`"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ news.judul }}</h5>
            <p class="card-text">
              {{ news.short_description }}
            </p>
            <p class="card-text">
              <small class="text-muted"
                >Dibuat pada: {{ formatDate(news.tanggal_dibuat) }}</small
              >
            </p>
            <router-link
              :to="{ name: 'detail-news', params: { judul: news.judul } }"
            >
              <a href="#" class="btn btn-primary">Baca Selengkapnya</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { useAuthStore } from "../../stores/auth";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const viewsAllNews = ref([]);

    const getAllNews = async () => {
      const data = await authStore.getAllNews();
      viewsAllNews.value = data;
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
      await getAllNews();
    });

    return { viewsAllNews, formatDate };
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif;
}
p,
a {
  font-family: "Quicksand";
}

.container {
  padding: 20px;
}
.news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.card-img-top {
  width: 100%;
  height: auto;
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
