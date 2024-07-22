import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi";
import { saveAs } from 'file-saver';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      role : "",
    },
    accessToken: "",
    authReady: false,
    cart_items: [],
  }),

  getters: {
    userDetail: (state) => state.user,
    cartDetail: (state) => state.cart_items, 
    isAuthenticated: (state) => state.accessToken ? true : false,
    AdminAuthenticated: (state) => {
      return state.accessToken && state.user.role === "admin";
    }
  },

  actions: {
    async attempt() {
      try {
        await this.refresh();
        await this.getUser();
      } catch (error) {
        return;
      }
    },
    async getAllNews (){
      try {
        const {data} = await useApi().get(`/api/news`);
        return data
      } catch (error) {
        throw error.message;
      }
    },
    async getNewsDetail(judul) {
      try {
        const { data } = await useApi().get(`/api/news/${judul}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async login(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token;
        await this.getUser();
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async loginAdmin(payload) {
      try {
        const { data } = await useApi().post(`/api/admin/login`, payload);
        this.accessToken = data.access_token;
        await this.getUser();
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async register(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/register`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/user`);
        this.user = data;
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = "";
        this.user = {};
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data.access_token;
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async getCart(){
      try{
        const { data } = await useApiPrivate().get(`/api/cart`);
        if (data.message === "Cart kosong") {
            this.cart_items = [];
        } else {
            this.cart_items = data.products;
        }

        // console.log(data)
        return data;
      }catch(error){
        throw error.message;
      }
    },
    async removeUser(userId){
      try {
        const {data} = await useApiPrivate().delete(`/api/admin/users/${userId}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async addToCart(payload) {
      try {
        const { data } = await useApiPrivate().post(`/api/cart/add`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async removeFromCart(productId) {
      try{
        const {data} = await useApiPrivate().post(`/api/cart/remove`,{productId}); 
        this.cart_items = this.cart_items.filter(item => item.id !== productId)
        return data;
      }catch(error){
        throw error.message;
      }
    },
    async checkout () {
      try {
        const { data } = await useApiPrivate().post(`/api/cart/checkout`);
        this.cart_items = []; 
        return data.transactionToken;
      } catch (error) {
        throw error.message;
      }
    },
    async midtransNotification(payload) { 
      try {
        const { data } = await useApiPrivate().post(`/api/cart/midtrans-notification`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async getPurchasedModules(){
      try{
        const {data} = await useApiPrivate().get(`/api/purchased-modules`);
        this.cart_items = []; 
        // console.log(data)
        return data;
        }catch(error){
          throw error.message;
        }
    },
    async getModulesByCourseId(courseId) {
      try {
        // console.log("Fetching modules for courseId:", courseId);
        const { data } = await useApiPrivate().get(`/api/purchased-modules/${courseId}`);
        // console.log("Modules data received:", data);

        return data;
      } catch (error) {
        throw error.message;
      }
    }, 
    async getOrdersUsers() {
      try{
      const { data } = await useApiPrivate().get('/api/admin/orders');
      // console.log(data)
      return data;
      }catch (error){
        throw error.message;
      }
    },
    async removeModuleUserByAdmin(userId, courseId){
      try{
      const { data } = await useApiPrivate().delete(`/api/admin/users/${userId}/courses/${courseId}`);
      return data;
    }catch(error){
      throw error.message
    }
    },
    async addModule(payload) {
      try {
        const { data } = await useApiPrivate().post(`/api/admin/modules`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async removeModule(moduleId){
      try {
        const { data } = await useApiPrivate().delete(`/api/admin/module/${moduleId}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async removeProduct(productId) {
      try {
        const { data } = await useApiPrivate().delete(`/api/admin/product/${productId}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async removeConsultation(consultationId) {
      try {
        const { data } = await useApiPrivate().delete(`/api/admin/consultation/${consultationId}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async removeNews(newsId) {
      try {
        const { data } = await useApiPrivate().delete(`/api/admin/news/${newsId}`);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async addProduct(payload) {
      try {
        const { data } = await useApiPrivate().post(`/api/admin/products`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async addConsultation(payload) {
      try {
        const { data } = await useApiPrivate().post(`/api/admin/consultation`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async viwesAllModules() {
      try{
      const { data } = await useApiPrivate().get('/api/admin/modules/getAllModules');
      return data;
      }catch (error){
        throw error.message;
      }
    },
    async viewsAllConsultation() {
      try{
      const { data } = await useApiPrivate().get('/api/admin/consultation/getAllConsultation');
      console.log(data)
      return data;
      }catch (error){
        throw error.message;
      }
    },
    async viewsAllNews() {
      try{
      const { data } = await useApiPrivate().get('/api/admin/news/getAllNews');
      console.log(data)
      return data;
      }catch (error){
        throw error.message;
      }
    },
    async downloadModule(moduleId) {
      try {
        const response = await useApiPrivate().get(`/api/download-module/${moduleId}`, {
          responseType: 'blob'
        });
        console.log(response)
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, `module_${moduleId}.pdf`);
      } catch (error) {
        throw error.message;
      }
    },
    async addNews(formData) {
      try {
        const { data } = await useApiPrivate().post(`/api/admin/addNews`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async updateModule(moduleId,payload) {
      try {
        const { data } = await useApiPrivate().put(`/api/admin/module/${moduleId}`,payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async updateProduct(productId,payload) {
      try {
        const { data } = await useApiPrivate().put(`/api/admin/product/${productId}`,payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async updateConsultation(consultationId,payload) {
      try {
        const { data } = await useApiPrivate().put(`/api/admin/consultation/${consultationId}`,payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    async updateNews(newsId,payload) {
      try {
        const { data } = await useApiPrivate().put(`/api/admin/news/${newsId}`,payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return data;
      } catch (error) {
        throw error.message;
      }
    },
  }
});
