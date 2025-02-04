<template>
    <div class="container px-8 py-6">
        <h1 class="text-xl underline-offset-2">{{ titre }}</h1>
        <h2 class="text-sm timestamp mb-3">{{ date }}</h2>
        <p v-for="text in desc" class="text-base text-justify mb-1" v-bind:key="text">{{ text }}</p>
        <div class="flex">
            <a v-for="link in links" :href="link.url" target="_blank" v-bind:key="link.name" class="link mr-4 flex text-sm">► {{ link.name }}</a>
        </div>
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
    border-left: var(--color-primary) 1px solid;
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