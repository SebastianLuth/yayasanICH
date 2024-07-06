<template>
    <div class="col">
      <div class="card h-100">
        <img :src="`http://localhost:8080${consultation.imageUrl}`" class="card-img-top" alt="..." />
        <div class="card-body">
          <button class="btn no-hover mb-2 bg-custom2">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-star me-1" style="font-size: 15px"></i>
            <p class="text-white mb-0 me-2">{{ consultation.averageRating }}</p>
          </div>
        </button>
          <h5 class="card-title">{{ consultation.name }}</h5>
          <p class="card-text">{{ consultation.description }}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <router-link
            :to="{ name: 'detail-consultation', params: { name: consultation.name } }"
          ><button class="btn btn-selengkapnya bg-custom">
              <p class="text-white mb-0 me-2">Detail Konsultasi</p>           
          </button>
          </router-link>
          <div>
          <i
            class="fa-solid fa-dollar-sign text-black"
            style="font-size: 15px"
            >{{ consultation.price }}</i
          >
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["consultation"],
  };
  </script>
  
  <style scoped>
  .bg-custom {
    background: #49a0ec;
  }
  .bg-custom2 {
    background: #2a9d3d;
  }
  .fa-star {
    color: white; 
  }
  .no-hover {
    pointer-events: none;
  }
  </style>