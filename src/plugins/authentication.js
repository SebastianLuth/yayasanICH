import { useAuthStore } from "../stores/auth";

const authentication = {
  async install() {
    const store = useAuthStore();
    try {
      await store.attempt();
      return Promise.resolve(); 
    } catch (error) {
      return Promise.reject(error); 
    }
  },
};

export default authentication;
