<template>
  <div class="w-full flex justify-center">
    <div class="path-container w-4/6 mt-16">
      <h1 class="text-3xl w-fit mb-6">Mon parcours</h1>
      <PathItem v-for="item in pathData" :key="item.id" :date="item.date" :titre="item.titre" :desc="item.desc" :links="item.links" class="mb-6"/>
    </div>
  </div>
</template>
  
<script>
import path from "./data/Path/path.json"
import PathItem from "../components/Path/PathItem.vue"

export default {
  name: "Path",
  data() {
    return {
      pathData: path
    };
  },
  components: {
    PathItem
  },
  methods: {
    
  },
};
</script>
  
<style>
.highlight {
  color: var(--text-primary);
}

.button {
  background-color: var(--color-primary);
  color: var(--text-secondary);
  transition: 0.3s;
}

.button:hover {
  background-color: var(--hover-color-primary);
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .path-container {
    width: 95% !important;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: none;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--widget-background-color);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--hover-widget-background-color);
}
</style>