<template>
  <div class="post-module">
    <h1>Tambah Modul Baru</h1>
    <form @submit.prevent="submitForm" enctype="multipart/form-data" method="post">
      <div>
        <label for="judul">Judul Modul</label>
        <input type="text" v-model="module.judul" required />
      </div>
      <div>
        <label for="deskripsi">Deskripsi Modul</label>
        <textarea v-model="module.deskripsi" required></textarea>
      </div>
      <div>
        <label for="penulis">Penulis</label>
        <input type="text" v-model="module.penulis" required />
      </div>
      <div>
        <label for="tanggal_dibuat">Tanggal Dibuat</label>
        <input type="date" v-model="module.tanggal_dibuat" required />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label"
          >Upload Modul PDF</label
        >
        <input class="form-control" type="file" id="formFile" @change="handleFileUpload" required />
      </div>

      <div v-for="(bab, babIndex) in module.bab" :key="babIndex" class="bab">
        <h2>Bab {{ babIndex + 1 }}</h2>
        <div>
          <label for="judul_bab">Judul Bab</label>
          <input type="text" v-model="bab.judul_bab" required />
        </div>
        <div>
          <label for="deskripsi_bab">Deskripsi Bab</label>
          <textarea v-model="bab.deskripsi_bab" required></textarea>
        </div>
        <div
          v-for="(materi, materiIndex) in bab.materi"
          :key="materiIndex"
          class="materi"
        >
          <h3>Materi {{ materiIndex + 1 }}</h3>
          <div>
            <label for="judul_materi">Judul Materi</label>
            <input type="text" v-model="materi.judul_materi" required />
          </div>
          <div>
            <label for="konten">Konten</label>
            <textarea v-model="materi.konten" required></textarea>
          </div>
          <div>
            <label for="video_url">URL Video</label>
            <input type="url" v-model="materi.video_url" required />
          </div>
          <div
            v-for="(quiz, quizIndex) in materi.quiz"
            :key="quizIndex"
            class="quiz"
          >
            <h4>Quiz {{ quizIndex + 1 }}</h4>
            <div>
              <label for="pertanyaan">Pertanyaan</label>
              <input type="text" v-model="quiz.pertanyaan" required />
            </div>
            <div
              v-for="(opsi, opsiIndex) in quiz.opsi"
              :key="opsiIndex"
              class="opsi"
            >
              <label
                :for="'opsi' + babIndex + materiIndex + quizIndex + opsiIndex"
                >Opsi {{ opsiIndex + 1 }}</label
              >
              <input
                type="text"
                :id="'opsi' + babIndex + materiIndex + quizIndex + opsiIndex"
                v-model="quiz.opsi[opsiIndex]"
                required
              />
            </div>
            <div>
              <label for="jawaban_benar">Jawaban Benar</label>
              <input type="text" v-model="quiz.jawaban_benar" required />
            </div>
          </div>
          <button @click.prevent="addQuiz(babIndex, materiIndex)">
            Tambah Quiz
          </button>
        </div>
        <button @click.prevent="addMateri(babIndex)">Tambah Materi</button>
      </div>
      <button @click.prevent="addBab">Tambah Bab</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
  <script>
import { useAuthStore } from "../../stores/auth";

export default {
  data() {
    return {
      module: {
        judul: "",
        deskripsi: "",
        penulis: "",
        tanggal_dibuat: "",
        bab: [
          {
            judul_bab: "",
            deskripsi_bab: "",
            materi: [
              {
                judul_materi: "",
                konten: "",
                video_url: "",
                quiz: [
                  {
                    pertanyaan: "",
                    opsi: ["", "", ""],
                    jawaban_benar: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    addBab() {
      this.module.bab.push({
        judul_bab: "",
        deskripsi_bab: "",
        materi: [
          {
            judul_materi: "",
            konten: "",
            video_url: "",
            quiz: [
              {
                pertanyaan: "",
                opsi: ["", "", ""],
                jawaban_benar: "",
              },
            ],
          },
        ],
      });
    },
    addMateri(babIndex) {
      this.module.bab[babIndex].materi.push({
        judul_materi: "",
        konten: "",
        video_url: "",
        quiz: [
          {
            pertanyaan: "",
            opsi: ["", "", ""],
            jawaban_benar: "",
          },
        ],
      });
    },
    addQuiz(babIndex, materiIndex) {
      this.module.bab[babIndex].materi[materiIndex].quiz.push({
        pertanyaan: "",
        opsi: ["", "", ""],
        jawaban_benar: "",
      });
    },
    async submitForm() {
      try {
        const authStore = useAuthStore();
        // console.log('Submitting module:', this.module);
        // const response = await authStore.addModule(this.module);
        const formData = new FormData();
        formData.append('judul', this.module.judul);
        formData.append('deskripsi', this.module.deskripsi);
        formData.append('penulis', this.module.penulis);
        formData.append('tanggal_dibuat', this.module.tanggal_dibuat);
        formData.append('bab', JSON.stringify(this.module.bab));
        formData.append('pdf', this.file);


        await authStore.addModule(formData);
        // console.log('Module added successfully:', response);
        alert("Modul berhasil ditambahkan");
        location.reload()
      } catch (error) {
        // console.error('Error adding module:', error);
        alert("Terjadi kesalahan saat menambahkan modul: " + error);
      }
    },
  },
};
</script>
  
  <style scoped>
.post-module {
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
  