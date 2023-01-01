<template>
  <div v-if="status == 'active'" class="path-item-active mt-6">
    <p class="timestamp">{{ date }}</p>
    <p class="text-xl">→ {{ titre }}</p>
    <p class="">{{ desc }}</p>
  </div>
  <div v-else class="path-item mt-6">
    <p class="timestamp">{{ date }}</p>
    <p class="text-xl">→ {{ titre }}</p>
    <p class="">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  name: "PathItem",
  data() {
    return {

    }
  },
  props: {
    date: '',
    titre: '',
    desc: '',
    status: ''
  }
}
</script>

<style scoped>
.path-item::before{
  content: "";
  position: absolute;
  top: 2px;
  left: -31px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--text-primary);
  border-radius: 100px;
  background-color: var(--background-color);
}

.timestamp {
  color: #909090;
}

.path-item-active::before {
  content: "";
  position: absolute;
  top: 2px;
  left: -31px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--text-primary);
  border-radius: 100px;
  background-color: var(--text-primary);
}
</style>