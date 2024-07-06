<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar bg-dark text-white p-3">
      <div class="d-flex p-2">
        <router-link :to="{ name: 'browse' }">
          <img
            src="../../../assets/img/logo-brand.png"
            class="me-2"
            height="100px"
          />
        </router-link>
      </div>
      <div>
        <a
          href="#"
          class="d-block p-2"
          @click.prevent="downloadModul(selectedModuleId)"
        >
          Download
        </a>
      </div>
      <div v-for="(chapter, cIndex) in chapters" :key="cIndex">
        <a href="#" class="d-block p-2" @click.prevent="toggleChapter(cIndex)">
          {{ chapter.judul_bab }}
        </a>
        <div v-show="chapter.isOpen" class="ml-3">
          <a
            href="#"
            class="d-block p-2"
            v-for="(item, index) in chapter.materi"
            :key="item._id"
            @click.prevent="showContent(cIndex, index)"
          >
            {{ item.judul_materi }}
          </a>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="content p-3">
      <div v-if="currentChapterIndex !== null && currentItemIndex !== null">
        <h1>
          Kursus Web Development
        </h1>
        <p>
          Web development adalah proses pembuatan dan pemeliharaan situs web. Ini mencakup berbagai aspek seperti desain web, pemrograman, manajemen konten, dan keamanan web.
        </p>
        <p>Download Module lengkap nya ->
          <a href="#">klik disini</a> atau klik Download
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../../stores/auth";
import { useRoute } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const chapters = ref([]);
    const currentChapterIndex = ref(null);
    const route = useRoute();
    const currentItemIndex = ref(null);
    const courseId = route.params.courseId;
    const selectedModuleId = ref(null);

    const fetchChapters = async () => {
      try {
        const data = await authStore.getModulesByCourseId(courseId);
        console.log("Modules data received:", data);
        if (data && data.length > 0) {
          chapters.value = data[0].bab.map((bab) => ({
            ...bab,
            isOpen: false,
          }));
          if (
            chapters.value.length > 0 &&
            chapters.value[0].materi.length > 0
          ) {
            currentChapterIndex.value = 0;
            currentItemIndex.value = 0;
          }
          // Simpan module ID untuk download
          selectedModuleId.value = data[0].id;
        }
      } catch (error) {
        console.error("Failed to fetch chapters", error);
      }
    };

    const toggleChapter = (index) => {
      chapters.value[index].isOpen = !chapters.value[index].isOpen;
    };

    const showContent = (cIndex, iIndex) => {
      currentChapterIndex.value = cIndex;
      currentItemIndex.value = iIndex;
    };

    const downloadModul = async (moduleId) => {
      try {
        console.log(moduleId)
        await authStore.downloadModule(moduleId);
      } catch (error) {
        console.error("Failed to download module", error);
      }
    };

    onMounted(() => {
      fetchChapters();
    });

    return {
      chapters,
      currentChapterIndex,
      currentItemIndex,
      toggleChapter,
      showContent,
      downloadModul,
      selectedModuleId,
    };
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
body {
  display: flex;
  margin: 0;
}
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.sidebar a {
  color: white;
  text-decoration: none;
}
.sidebar a:hover {
  background-color: #007bff;
}
.content {
  margin-left: 250px;
  width: 100%;
  padding: 20px;
}
</style>
  