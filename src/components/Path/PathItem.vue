<template>
    <div class='container px-8 py-6'>
        <h1 class="text-xl underline-offset-2">{{ titre }}</h1>
        <h2 class="text-sm timestamp mb-3">{{ date }}</h2>
        <p v-for="text in desc" class="text-base text-justify mb-1" v-bind:key="text">{{ text }}</p>
        <div class="flex">
            <a v-for="link in links" :href="link.url" target="_blank" v-bind:key="link.name" class="link mr-4 flex text-sm">► {{ link.name }}</a>
        </div>
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
        links: []
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