<template>
    <div v-if="!hideFooter" class="Footer bg-custom text-white">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ">
              <div class="row g-0 align-items-center justify-content-center">
                <div class="col-md-6">
                  <img
                    src="../assets/img/logo-brand.png"
                    class="img-fluid rounded-start"
                    alt="Foto Footer"
                    width="250px"
                  />
                </div>
                <div class="col-md-6">
                  <div class="body">
                    <h4 class="-title">ADDRESS</h4>
                    <p class="text">
                      Gg. Ridho No.11E, Hutan, Kec. Percut Sei Tuan, Kota Medan, Sumatera Utara 20371
                    </p>
                  </div>
                </div>
              </div>
            
          </div>
          <div class="col-md-3">
              <div class="row g-0 align-items-center justify-content-center" style="height: 200px"> 
                <div class="col">
                  <div class="body">
                    <h5 class="title" style="font-weight: 560;">Fun Learning</h5>
                    <h5 class="title" style="font-weight: 560;">Unlock Your potential</h5>
                    <p class="text">
                        <a href="#" style="text-decoration: none; color: white;"> Tentang Kami</a>
                    </p>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-1">
              <div class="row g-0 align-items-center justify-content-center"
              style="height: 200px;">
                <div class="col">
                  <div class="body">
                    <p class="text">Kelas</p>
                    <p class="text">
                     Layanan
                    </p>
                    <p class="text">
                     Hubungi Kami
                    </p>
                  </div>
                </div>
              </div>          
          </div>
        </div>
        <div class="head3 d-flex justify-content-between">
          <h6>&#169;Learn Web Development | LWD adalah merek milik PT LWD Akademi Indonesia.</h6>
          <div class="p-1">
            <h4 class="text">
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-facebook"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-instagram"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="far fa-envelope"></i> 
                    </a>
                    <a href="#" class="text-decoration-none me-3">
                      <i class="fab fa-youtube"></i>
                    </a>
                  </h4>
          </div>
        </div>
      </div>
    </div>
  </template> 
  <script>
  export default {
    computed: {
      hideFooter: function () {
        return this.$route.name === 'myModule' || /^\/module\//.test(this.$route.path);
      }
    },
    watch : {
      $route() {
      // This will re-compute hideNavbar whenever the route changes
      this.hideNavbar;
    }
    }
  };
  </script>
  
  <style scoped>
 
  .bg-custom {
    background-color: #002b5c;
  }
  </style>
  