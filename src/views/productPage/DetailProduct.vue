<template>
  <div class="mt-3 mb-5">
    <div class="container">
      <div class="content" v-if="product">
        <div class="float-start">
          <h6>Rating : {{ product.averageRating }}</h6>
          <h1>E- Course {{ product.name }}</h1>
        </div>
        <div class="float-sm-end" style="width: 30%">
          <div id="page-wrap">
            <div id="img-wrap">
              <img :src="`http://localhost:8080${product.imageUrl}`" />
            </div>
            <div id="product-details">
              <h4>{{ product.name }}</h4>
              <p>{{ product.name }}</p>
              <h3 id="price">{{ product.price }}</h3>
              <div v-if="isAuthenticated">
                <button
                  @click="startLearning(product.id)"
                  class="btn btn-primary"
                >
                  Start Learning
                </button>
              </div>
              <div v-else>
                <router-link :to="{ name: 'cart' }">
                  <button>Add To Cart</button>
                </router-link>
              </div>
            </div>
          </div>
          <div id="materialInclude">
            <div class="card" style="width: 18rem">
              <div class="card-body">
                <h5 class="card-title">Material Include</h5>
                <ol style="list-style-type: circle">
                  <li
                    v-for="material in product.materialInclude"
                    :key="material"
                  >
                    {{ material }}
                  </li>
                </ol>
                <h5 class="card-title mt-5">Target Audience</h5>
                <ol style="list-style-type: circle">
                  <li v-for="target in product.targetAudience" :key="target">
                    {{ target }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotFound v-else />
      <div style="width: 70%">
        <div id="page-wrap">
          <div id="video-wrap">
            <iframe width="650" height="400" :src="product.videoUrl"> </iframe>
          </div>
          <div id="Course Info">
            <p class="d-inline-flex gap-1">
              <a
                class="m-3"
                @click="toggleCollapse('courseInfo')"
                role="button"
                aria-expanded="true"
                aria-controls="collapseCourseInfo"
              >
                Course Info
              </a>
              <a
                class="m-3"
                @click="toggleCollapse('ratings')"
                role="button"
                aria-expanded="false"
                aria-controls="collapseRatings"
              >
                Ratings
              </a>
            </p>

            <div
              class="collapse"
              :class="{ show: activeCollapse === 'courseInfo' }"
              id="collapseCourseInfo"
            >
              <div class="card card-body" style="width: 750px" id="course-info">
                <div id="about-course">
                  <h5>About Course</h5>
                  <div v-html="product.longDescription"></div>
                </div>
                <div id="what-learn" class="mb-4 mt-4">
                  <h5>What I Will Learn</h5>
                  <div id="list">
                    <ol class="list-group list-group-horizontal">
                      <li
                        class="list-group-item mt-2 ms-1 mb-1"
                        style="width: 300px"
                        v-for="(learned, index) in product.willLearn"
                        :key="index"
                      >
                        <i class="fa-solid fa-check"></i>
                        {{ learned }}
                      </li>
                    </ol>
                  </div>
                </div>
                <div id="curriculum-course">
                </div>
              </div>
            </div>
            <div
              class="collapse"
              :class="{ show: activeCollapse === 'ratings' }"
              id="collapseRatings"
            >
              <div class="card card-body" style="width: 750px">
                Ratings Content : {{ product.averageRating }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import axios from "axios";
import { useAuthStore } from "../../stores/auth";
import NotFound from "../errors/404Page.vue";
// import { onMounted, ref } from "vue";

export default {
  components: {
    NotFound,
  },
  data() {
    return {
      product: {
        willLearn: [],
      },
      activeCollapse: "courseInfo",
    };
  },
  async created() {
    const uniqName = this.$route.params.name;
    const result = await axios.get(
      `http://localhost:8080/api/products/${uniqName}`
    );
    this.product = result.data;
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
  },
  methods: {
    toggleCollapse(collapseId) {
      if (this.activeCollapse === collapseId) {
        this.activeCollapse = ""; // Tutup collapse jika sudah terbuka
      } else {
        this.activeCollapse = collapseId; // Buka collapse yang di-klik
      }
    },
    async addToCart(product) {
      await axios.post("http://localhost:8080/api/orders/user/1/add", {
        product: product,
      });
    },
    startLearning(courseId) {
      this.$router.push({ name: "myModule", params: { courseId } });
    },
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
h1 {
  text-align: start;
}

#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}
</style>
