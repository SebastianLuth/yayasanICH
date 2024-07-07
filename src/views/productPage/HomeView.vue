<template>
  <div class="home">
    <div class="content">
      <div class="container">
        <div
          class="row align-items-center justify-content-center"
          id="headline"
        >
          <div class="col-5">
            <div id="headline-text">
              <h1 style="font-weight: 700; text-align: start">
                Belajar IT di ICH Institute
              </h1>
              <p>
                Belajar IT di ICH Institute: Terobosan Baru Menuju Keahlian yang
                Menguntungkan Setiap Hari!.
              </p>
              <div class="d-flex">
                <router-link :to="{ name: 'login' }">
                  <button class="mulai m-2 p-2 bg-custom2">
                    <h4>Mulai</h4>
                  </button>
                </router-link>
                <router-link :to="{ name: 'login' }">
                  <button class="materi m-2 p-2 bg-custom2">
                    <h4>Materi</h4>
                  </button>
                </router-link>
              </div>
              <div class="d-flex mt-3">
                <div class="d-flex flex-column">
                  <div class="m-0"><h2>5+</h2></div>
                  <div class="m-0">
                    <hr style="border-width: 5px" />
                  </div>
                  <div class="m-0">Instruktur</div>
                </div>
                <div class="d-flex flex-column">
                  <div class="ms-5"><h2>100+</h2></div>
                  <div class="ms-5">
                    <hr style="border-width: 5px" />
                  </div>
                  <div class="ms-5">Peserta</div>
                </div>
                <div class="d-flex flex-column">
                  <div class="ms-5"><h2>10+</h2></div>
                  <div class="ms-5">
                    <hr style="border-width: 5px" />
                  </div>
                  <div class="ms-5">Kelas</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="img" id="headline-img">
              <img
                class="img-fluid"
                src="../../assets/img/Bg-home1.png"
                alt="Foto Headline"
                width="620px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="kontenk bg-custom">
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-6">
            <div
              class="card mb-3 border-0"
              style="max-width: 540px; background-color: transparent"
            >
              <div class="row g-0">
                <div class="col">
                  <div class="card-body">
                    <div class="trusted d-flex">
                      <i
                        class="fa-solid fa-star mt-1"
                        style="font-size: 22px"
                      ></i>
                      <p class="ms-2" style="font-size: 22px">
                        Terjamin Dan Bersertifikat
                      </p>
                    </div>
                    <h2 class="card-title" style="font-weight: 560">
                      Belajar dimanapun dan kapanpun
                    </h2>
                    <button class="btn btn-selengkapnya mt-5 bg-custom2">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <p class="text-black mb-1 me-2" style="font-weight: bold">Selengkapnya</p>
                        <i class="fa-solid fa-arrow-right text-black"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card mb-3 border-0"
              style="max-width: 540px; background-color: transparent"
            >
              <div
                class="row g-0 justify-content-between"
                style="height: 400px"
              >
                <div class="row justify-content-between">
                  <div class="card-body" style="border: none">
                    <h5 class="card-title" style="font-weight: 560">
                      Jadwal Flexibel
                    </h5>
                    <p class="card-text">
                      Memungkinkan pelajar menyelesaikan kelas dengan cepat dan
                      mudah.
                    </p>
                    <hr style="width: 60%; border-width: 5px" />
                  </div>
                  <div class="card-body card2">
                    <h5 class="card-title" style="font-weight: 560">
                      Komunitas
                    </h5>
                    <p class="card-text">
                      kamu juga didukung oleh komunitas yang siap bantu kamu
                      berkembang.
                    </p>
                    <hr style="width: 60%; border-width: 5px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card mb-3 border-0"
              style="max-width: 540px; background-color: transparent"
            >
              <div
                class="row g-0 align-items-center justify-content-center"
                style="height: 400px"
              >
                <div class="col">
                  <div class="card-body" style="border: none">
                    <h5 class="card-text" style="font-weight: 560">
                      Materi Up to Date
                    </h5>
                    <p class="card-text">
                      Kami selalu mengikuti perkembangan terbaru dari bidang
                      digital marketing.
                    </p>
                    <hr style="width: 60%; border-width: 5px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conten2 bg-custom">
      <div class="container text-center p-5">
        <div class="row align-items-center">
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-google.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-microsoft.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-kemkominfo.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-lintasarta-new.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-kemenparekraf.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
        </div>
        <div class="row align-items-center mt-3">
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-xl.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-indosat-ooredoo-hutchison.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-lenovo.png"
                alt="Logo"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-dbsf-2x.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/homepage-partner-bangkit.png"
                alt="Logo"
                class="img-fluid p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conten3 mt-5">
      <div class="container">
        <div class="head3 d-flex justify-content-between">
          <h4>Kelas Paling laris</h4>
          <div class="p-1">
            <a href="#" class="text-black text-decoration-none me-5">Semua</a>
            <a href="#" class="text-black text-decoration-none me-5">Layanan</a>
            <a href="#" class="text-black text-decoration-none"
              >Web Developer</a
            >
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <productItems
            v-for="product in products"
            :key="product.id"
            :product="product"
          >
          </productItems>
        </div>
        <h6 style="text-align: center" class="m-5">
          Selain Menyediakan kelas online kami juga menyediakan Konsultaion ---
        </h6>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <ConsultationItem
            v-for="consultation in consultations"
            :key="consultation.id"
            :consultation="consultation"
          >
          </ConsultationItem>
        </div>
        <div class="text-center mt-5">
          <span
            >Bantu kamu menemukan Instructur terbaik.
            <a href="#" style="color: black">Jelajahi berbagai kelas</a></span
          >
        </div>
      </div>
    </div>

    <div class="conten4 mt-5 bg-custom">
      <div class="container">
        <div
          class="row align-items-center justify-content-center"
          id="headline2"
        >
          <div class="col-6 align-items-center d-flex">
            <div class="img" id="headline-img">
              <img
                class="img-fluid"
                src="../../assets/img/Bg-home2.png"
                alt="Foto Headline"
                style="width: 100%; height: auto"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="trusted d-flex">
              <i class="fa-solid fa-heart" style="font-size: 22px"></i>
              <p class="ms-2" style="font-size: 22px">
                Pengalaman Belajar Yang Luar Biasa
              </p>
            </div>
            <div id="headline-text">
              <h3>
                Ambil langkah selanjutnya menuju tujuan pribadi dan profesional
                bisnis anda dengan ICH Institute
              </h3>
              <p class="mt-3">
                Bergabunglah sekarang untuk menerima rekomendasi yang
                dipersonalisasi dari katalog lengkap LWD.
              </p>
              <router-link :to="{ name: 'login' }">
                <button class="btn btn-selengkapnya mt-5 bg-custom2 ms">
                  <div class="d-flex align-items-center justify-content-center">
                    <p class="text-black mb-0 me-2" style="font-weight: bold">Gabung Sekarang</p>
                  </div>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="inviteJoin">
          <h2 class="text-center">
            Tingkatkan Pengalaman Belajar Anda di
            <span style="color: #946608">ICH Institute</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="conten5 mt-5 mb-5">
      <div class="container"></div>
      <div class="container text-center bg-custom p-5">
        <h4>Tunggu Apa Lagi</h4>
        <p>
          Belajar lebih terarah dengan learning path dan instruktur yang hebat
        </p>
        <router-link :to="{ name: 'login' }">
          <button class="btn btn-selengkapnya mt-5 bg-custom2 ms text-black" style="font-weight: bold">
            Buat Akun
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import productItems from "../../components/ProductItems.vue";
import ConsultationItem from "../../components/consultationItem.vue";
import axios from "axios";
// import { consultations } from "../../data-seed";

export default {
  name: "HomeView",
  components: {
    productItems,
    ConsultationItem,
  },
  data() {
    return {
      products: [],
      consultations: [],
    };
  },
  async created() {
    try {
      const result = await axios.get("https://api-yayasan-ich.vercel.app/api/products");
      const result2 = await axios.get("https://api-yayasan-ich.vercel.app/api/consultation");
      this.products = result.data;
      this.consultations = result2.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
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
.mulai {
  border-style: solid;
  border-color: #f5b831;
  border-radius: 50px 25px;
  color: black;
  width: 100px;
}
.materi {
  border-style: solid;
  border-color: #f5b831;
  border-radius: 25px 50px;
  color: black;
  width: 100px;
}

.btn-selengkapnya {
  border-radius: 20px;
  width: 200px;
}

.card2 {
  margin-top: 80px;
}
.bg-custom {
  background: #4eacb9;
}
.bg-custom2 {
  background: #f5b831;
}
hr {
  color: rgb(10, 10, 10);
}
span {
  text-align: center;
}
#headline2 {
  height: 500px;
}
.fa-star {
  display: inline-block;
  width: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  height: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  border-radius: 50%; /* Membuat sudut menjadi lingkaran */
  background-color: darkorange; /* Warna latar belakang */
  text-align: center; /* Menengahkan ikon */
  line-height: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  font-size: 22px; /* Sesuaikan dengan ukuran ikon Anda */
  color: white; /* Warna ikon */
}
.fa-heart {
  display: inline-block;
  width: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  height: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  border-radius: 50%; /* Membuat sudut menjadi lingkaran */
  background-color: darkorange; /* Warna latar belakang */
  text-align: center; /* Menengahkan ikon */
  line-height: 30px; /* Sesuaikan dengan ukuran ikon Anda */
  font-size: 22px; /* Sesuaikan dengan ukuran ikon Anda */
  color: white; /* Warna ikon */
}
</style>
