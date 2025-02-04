<template>
    <div class="flex rounded sm:w-max px-5 py-3 m-2 w-max items-center" id="comp-container">
      <img v-if="icon == 'python'" src="/Home/python.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'nodejs'" src="/Home/nodejs.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'git'" src="/Home/git.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'sql'" src="/Home/sql.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'bash'" src="/Home/bash.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'php'" src="/Home/php.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'react'" src="/Home/react.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'vue'" src="/Home/vue.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'html'" src="/Home/html.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'css'" src="/Home/css.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'js'" src="/Home/js.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'ansible'" src="/Home/ansible.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'docker'" src="/Home/docker.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'k8s'" src="/Home/k8s.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'linux'" src="/Home/linux.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'helm'" src="/Home/helm.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'nginx'" src="/Home/nginx.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'angular'" src="/Home/angular.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'typescript'" src="/Home/typescript.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'postgresql'" src="/Home/postgresql.svg" alt="" class="w-10 h-10">
      <div class="ml-3 w-max h-max">
        <h1 class="text-lg">{{ nom }}</h1>
      </div>
    </div>
</template>

<script>
export default {
  name: "CompItem",
  data() {
    return {
      
    }
  },
  props: {
    nom: '',
    icon: '',
    valeur: ''
  }
}
</script>

<style scoped>
#comp-container{
  background-color: var(--widget-background-color);
}

#bar-container {
  background-color: #e0e0e0;
}

#bar-value {
  background-color: var(--color-primary);
}

.value-100 {
  width: 256px;
}

.value-90 {
  width: 230px;
}

.value-80 {
  width: 204px;
}

.value-70 {
  width: 178px;
}

.value-60 {
  width: 152px;
}

.value-50 {
  width: 126px;
}

.value-40 {
  width: 100px;
}

.value-30 {
  width: 74px;
}

.value-20 {
  width: 48px;
}

.value-10 {
  width: 22px;
}

.value-0 {
  width: 0px;
}


.value-100m {
  width: 192px;
}

.value-90m {
  width: 172px;
}

.value-80m {
  width: 152px;
}

.value-70m {
  width: 132px;
}

.value-60m {
  width: 112px;
}

.value-50m {
  width: 92px;
}

.value-40m {
  width: 72px;
}

.value-30m {
  width: 52px;
}

.value-20m {
  width: 32px;
}

.value-10m {
  width: 12px;
}

.value-0m {
  width: 0px;
}

</style>