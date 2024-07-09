<template>
  <div>
    <div class="container mt-5" v-if="consultation" >
        <div class="row align-items-center justify-content-center">
            <div class="col-md-8">
                <h5>Bersama Layanan Konsultasi ICH</h5>
                <h2>{{ consultation.header }}</h2>
                <p>{{ consultation.description }}</p>
                <button class="cta-button">Temukan Solusi Bisnismu &raquo;</button>
            </div>
            <div class="col-md-4">
                <img :src="`${consultation.imageUrl}`" :alt="consultation.name" class="img-fluid">
                <h2>{{consultation.name}}</h2>
                <p> Rating : {{consultation.averageRating}}</p>
            </div>
        </div>
        <div class="mt-4">
            <h5>Layanan {{ consultation.name }} kami apa saja :</h5>
            <ul>
                <li v-for="consultationInclude in consultation.consultationInclude"
                :key="consultationInclude">
                {{ consultationInclude }}
              </li>
            </ul>
        </div>
        <div class="text-center mt-4">
            <button class="cta-button" style="width: 500px; border-radius: 10px;">Temukan Solusi Bisnismu &raquo;</button>
        </div>
    </div>
    <NotFound v-else />
  </div>
  

</template>
      
<script >
import axios from 'axios'
import NotFound from "../errors/404Page.vue";

export default {
  components: {
    NotFound,
  },
  data() {
    return {
      consultation: {}
    };
  },
  async created() {
    const uniqName = this.$route.params.name;
    const result = await axios.get(`https://api-yayasan-ich.vercel.app/api/consultation/${uniqName}`)
    this.consultation = result.data;
  },
};
</script>
      
<style scoped>
h1,h2,h3,h4,h5,h6 {
  font-family: "Poppins", sans-serif;
}
p, a{
  font-family: "Quicksand";
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

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}
.cta-button {
            background-color: #ff6a00;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 18px;
        }
        .cta-button:hover {
            background-color: #e65c00;
        }
    
</style>
