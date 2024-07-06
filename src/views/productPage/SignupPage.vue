<template>
  
  <div class="register">
    <div class="post-module">
      <h2 class="m-2">Daftar Akun Anda</h2>
    <div class="container">
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="exampleInputUsername" class="form-label">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="exampleInputUsername"
            aria-describedby="username"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"  
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputFirstName" class="form-label"  
            >First Name</label
          >
          <input
            v-model="first_name"
            type="text"
            class="form-control"
            id="exampleInputFirstName"
            aria-describedby="firstNameHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputLastName" class="form-label"  
            >Last Name</label
          >
          <input
            v-model="last_name"
            type="text"
            class="form-control"
            id="exampleInputLastName"
            aria-describedby="lastNameHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">Confirm Your Password</label>
          <input
            v-model="password_confirm"
            type="password"
            class="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
  </div>
</template>
  
  <script>
import { useAuthStore } from "../../stores/auth";

export default {
  data() {
    return {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    async register() {
      try {
        const authStore = useAuthStore();
        await  authStore.register({
          username: this.username,
          email: this.email,
          first_name : this.first_name,
          last_name : this.last_name,
          password: this.password,
          password_confirm : this.password_confirm
        });

        // Jika register berhasil, redirect ke halaman login
        this.$router.push(`/login`);
      } catch (error) {
        // Tangani error jika register gagal
        console.error("Registration failed:", error.response.data.message);
      }
    },
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
.post-module {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>