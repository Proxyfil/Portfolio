<template>
  <div class="project-item mt-6 p-2 rounded w-full">
    <p class="timestamp">{{ date }}</p>
    <p class="text-xl">→ {{ titre }}</p>
    <p class="">{{ desc }}</p>
    <div class="flex p-1">
      <img v-if="techs.includes('python')" src="/Home/python.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('nodejs')" src="/Home/nodejs.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('git')" src="/Home/git.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('sql')" src="/Home/sql.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('bash')" src="/Home/bash.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('php')" src="/Home/php.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('react')" src="/Home/react.svg" alt="" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('vue')" src="/Home/vue.svg" alt="" class="w-6 h-6 mr-1">
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",
  data() {
    return {

    }
  },
  props: {
    date: '',
    titre: '',
    desc: '',
    techs: []
  }
}
</script>

<style scoped>
.project-item {
  background-color: var(--widget-background-color);
}

.timestamp {
  color: #909090;
}
</style>