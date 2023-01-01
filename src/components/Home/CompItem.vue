<template>
    <div class="flex rounded sm:w-max px-5 py-3 m-2 w-max" id="comp-container">
      <img v-if="icon == 'python'" src="/Home/python.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'nodejs'" src="/Home/nodejs.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'git'" src="/Home/git.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'sql'" src="/Home/sql.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'bash'" src="/Home/bash.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'php'" src="/Home/php.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'react'" src="/Home/react.svg" alt="" class="w-10 h-10">
      <img v-if="icon == 'vue'" src="/Home/vue.svg" alt="" class="w-10 h-10">
      <div class="ml-3">
        <h1 class="text-lg">{{ nom }}</h1>
        <div class="rounded w-64 max-sm:hidden" id="bar-container">
          <div class="h-2 rounded" id="bar-value" v-bind:class="{'value-100': valeur==100, 'value-90': valeur==90, 'value-80': valeur==80, 'value-70': valeur==70, 'value-60': valeur==60, 'value-50': valeur==50, 'value-40': valeur==40, 'value-30': valeur==30, 'value-20': valeur==20, 'value-10': valeur==10, 'value-0': valeur==0}"></div>
        </div>
        <div class="rounded w-48 sm:hidden" id="bar-container">
          <div class="h-2 rounded" id="bar-value" v-bind:class="{'value-100m': valeur==100, 'value-90m': valeur==90, 'value-80m': valeur==80, 'value-70m': valeur==70, 'value-60m': valeur==60, 'value-50m': valeur==50, 'value-40m': valeur==40, 'value-30m': valeur==30, 'value-20m': valeur==20, 'value-10m': valeur==10, 'value-0m': valeur==0}"></div>
        </div>
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