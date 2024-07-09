<template>
  <div class="login">
    <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p> Belum memiliki akun ? : <a href="/register" style="text-decoration: none;">Daftar disini</a></p>
    </div>
  </div>
</template>
  
  <script>
// import router from '@/router';
import { useAuthStore } from "../../stores/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const authStore = useAuthStore();
        if (
          this.email === "admin@example.com" &&
          this.password === "admin123"
        ) {
          await authStore.loginAdmin({
            email: this.email,
            password: this.password,
          });
        }
        await authStore.login({
          email: this.email,
          password: this.password,
        });

        if (authStore.userDetail.role === "admin") {
          console.log("Redirecting to admin page");
          this.$router.replace({ name: "admin" });
        } else {
          this.$router.replace({ name: "browse" });
        }
      } catch (error) {
        // Tangani error jika login gagal
        console.error("Login failed:");
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
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
  
