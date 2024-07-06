const { ref, computed } = require('vue');
const { defineStore } = require('pinia');

const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

module.exports = useCounterStore;
