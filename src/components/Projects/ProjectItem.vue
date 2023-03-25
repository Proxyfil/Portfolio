<template>
    <div class="container px-8 py-6">
        <h1 class="text-xl underline-offset-2 underline">{{ titre }}</h1>
        <h2 class="text-sm timestamp mb-3">{{ date }}</h2>
        <p v-for="text in desc" class="text-base text-justify mb-1" v-bind:key="text">{{ text }}</p>
        <div class="flex">
            <a v-for="link in links" :href="link.url" target="_blank" v-bind:key="link.name" class="link mr-4 flex text-sm">► {{ link.name }}</a>
        </div>
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
        image: '',
        links: [],
        techs: []
    }
}
</script>
  
<style scoped>
.timestamp {
  color: #909090;
}

.container {
    border: var(--color-primary) 1px solid;
    border-radius: 10px;
}

.link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
}

.link:hover {
  color: var(--hover-color-primary);
}
</style>