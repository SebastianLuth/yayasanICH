<template>
  <div class="container">
    <div id="page-wrap">
      <h1>Keranjang</h1>
      <div v-if="cart_items.length" class="row mt-5 mb-5">
        <div class="col-8">
          <section class="intro mb-3">
                <div class="bg-image h-100">
                  <div class="mask d-flex align-items-center h-100">
                    <div class="container">
                      <div class="row justify-content-center">
                        <div class="col-12">
                          <div
                            class="card shadow-2-strong"
                            style="background-color: #f5f7fa"
                          >
                            <div class="card-body">
                              <div class="table-responsive">
                                <table class="table table-borderless mb-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">Produk</th>
                                      <th scope="col">Kuantitas</th>
                                      <th scope="col">Harga</th>
                                      <th scope="col">Hapus</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="cartItem in cart_items"
                                      :key="cartItem.productId._id"
                                    >
                                      <td scope="row">
                                        <div class="d-flex align-items-center">
                                          <div>
                                            <img
                                              :src="`http://localhost:8080${cartItem.productId.imageUrl}`"
                                              alt=""
                                              class="product-image me-2"
                                            />
                                          </div>
                                          <div>
                                            <p>Ratings: {{ cartItem.productId.averageRating }}</p>
                                            <p>{{ cartItem.productId.name }}</p>
                                            <p>Rp {{ cartItem.productId.price}}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{{ cartItem.quantity }}</td>
                                      <td>
                                        {{
                                          cartItem.productId.price *
                                          cartItem.quantity
                                        }}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          class="btn btn-danger btn-sm px-3"
                                          @click="
                                            removeFromCart(
                                              cartItem.productId._id
                                            )
                                          "
                                        >
                                          <i class="fas fa-times"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        </div>

        <div class="col-4">
          <h3 id="total price">Total: {{ totalPrice }}</h3>
          <button id="checkout-button" @click="checkout()">Checkout</button>
        </div>
      </div>
      <div v-else class="row mt-5 mb-5">
        <p>Keranjang kosong</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../../stores/auth';
import { onMounted, ref } from 'vue';
import router from '@/router';

export default {
  setup() {
    const authStore = useAuthStore();
    const cart_items = ref([]);

    const getCart = async () => {
      await authStore.getCart();
      cart_items.value = authStore.cart_items;
    };

    const removeFromCart = async(productId) => {
      try {
        await authStore.removeFromCart(productId);
        await getCart();
      } catch (error) {
        console.error("Failed to remove item from cart:", error.message);
      }
    };

    const checkout = async () => {
      try {
        const transactionToken = await authStore.checkout();
        window.snap.pay(transactionToken, {
          onSuccess: async function(result){
            alert("Payment successful!");
            // Send notification to backend
            await authStore.midtransNotification(result);
            alert("Produk telah ditambahkan dan telah masuk ke DB.");
            router.push({name : 'user'});
          },
          onPending: function(){
            alert("Waiting for payment!");
          },
          onError: function(){
            alert("Payment failed!");
          },
          onClose: function(){
            alert('Payment popup closed without finishing payment');
          }
        });
      } catch (error) {
        console.error("Checkout failed:", error.message);
      }
    }

    onMounted(async () => {
      await getCart();
    });

    return { cart_items, removeFromCart,checkout };
  },
  computed: {
    totalPrice() {
      return this.cart_items.reduce((sum, item) => sum + (Number(item.productId.price) * Number(item.quantity)), 0);
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
h1 {
  border-bottom: 1px solid #41b883;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}
#total-price {
  padding: 16px;
  text-align: right;
}
#checkout-button {
  width: 100%;
}
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}
.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}
.details-wrap {
  padding: 0 16px;
  flex: 3;
}
.remove-button {
  flex: 1;
  margin: auto;
}
</style>