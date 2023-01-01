<template>
  <div id="app" class="min-h-screen">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
