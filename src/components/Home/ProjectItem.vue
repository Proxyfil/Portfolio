<template>
  <div class="project-item mt-6 p-2 rounded w-full">
    <p class="timestamp">{{ date }}</p>
    <p class="text-xl">→ {{ titre }}</p>
    <p class="">{{ desc }}</p>
    <div class="flex p-1">
      <img v-if="techs.includes('python')" src="/Home/python.svg" alt="python" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('nodejs')" src="/Home/nodejs.svg" alt="nodejs" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('git')" src="/Home/git.svg" alt="git" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('sql')" src="/Home/sql.svg" alt="sql" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('bash')" src="/Home/bash.svg" alt="bash" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('php')" src="/Home/php.svg" alt="php" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('react')" src="/Home/react.svg" alt="react" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('vue')" src="/Home/vue.svg" alt="vue" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('html')" src="/Home/html.svg" alt="html" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('css')" src="/Home/css.svg" alt="css" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('js')" src="/Home/js.svg" alt="js" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('ansible')" src="/Home/ansible.svg" alt="ansible" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('docker')" src="/Home/docker.svg" alt="docker" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('k8s')" src="/Home/k8s.svg" alt="k8s" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('linux')" src="/Home/linux.svg" alt="linux" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('helm')" src="/Home/helm.svg" alt="helm" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('nginx')" src="/Home/nginx.svg" alt="nginx" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('angular')" src="/Home/angular.svg" alt="angular" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('typescript')" src="/Home/typescript.svg" alt="typescript" class="w-6 h-6 mr-1">
      <img v-if="techs.includes('postgresql')" src="/Home/postgresql.svg" alt="postgresql" class="w-6 h-6 mr-1">
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