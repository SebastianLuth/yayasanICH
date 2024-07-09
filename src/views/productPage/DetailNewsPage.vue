<template>
  <div v-if="news" class="detail-berita">
    <div class="header">
      <h1>{{ news.judul }}</h1>
    </div>
    <div class="content">
      <img :src="`${news.image_one}`" :alt="news.judul" />
      <div class="info">
        <span class="tanggal">{{ formatDate(news.tanggal_dibuat) }}</span>
      </div>
      <div v-html="news.konten"></div>
    </div>
    <div class="head3 d-flex justify-content-between">
          <div class="p-1">
            <h4 class="text">
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-facebook" style="font-size: 40px;"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-instagram" style="font-size: 40px;"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="far fa-envelope" style="font-size: 40px;"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-youtube" style="font-size: 40px;"></i>
                    </a>
                  </h4>
          </div>
        </div>
  </div>
  <div class="container">
    <h5 style="text-align: start">Temukan Berita Lainnya</h5>
    <div class="news-container" v-if="viewsAllNews.length > 0">
      <div v-for="news in viewsAllNews" :key="news.id">
        <div class="card" style="width: 18rem">
          <img
            :src="`http://localhost:8080${news.image_one}`"
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
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";

export default {
  props: ["judul"],
  setup(props) {
    const authStore = useAuthStore();
    const news = ref(null);
    const viewsAllNews = ref([]);

    const getAllNews = async () => {
      const data = await authStore.getAllNews();
      viewsAllNews.value = data;
    };

    const getNewsDetail = async () => {
      try {
        // console.log("Judul:", props.judul);
        const data = await authStore.getNewsDetail(props.judul);
        news.value = data;
        console.log(data)
      } catch (error) {
        console.error(error.message);
      }
    };

    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return "Invalid Date";
      }
      return parsedDate.toLocaleDateString("id-ID", options);
    };

    onMounted(async () => {
      await getAllNews();
    });
    onMounted(getNewsDetail);

    return { news, formatDate, viewsAllNews };
  },
};
</script>
<style scoped>
.detail-berita {
  width: 60%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #333;
}

.info {
  display: flex;
  justify-content: start;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #777;
}

.kategori {
  margin-right: 15px;
}

.content img {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.content p {
  margin-bottom: 15px;
  text-align: justify;
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
