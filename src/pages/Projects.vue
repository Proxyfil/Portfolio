<template>
  <div class="w-full flex justify-center">
    <div class="project-container w-4/6 mt-16">
      <h1 class="project-title text-3xl w-fit mb-6">Mes projets</h1>
      <ProjectItem v-for="item in projectsData" :key="item.id" :date="item.date" :titre="item.titre" :desc="item.desc" :techs="item.techs" :image="item.image" :links="item.links" class="mb-6"/>
    </div>
  </div>
</template>
    
<script>
import projects from "./data/Projects/projects.json"
import ProjectItem from "../components/Projects/ProjectItem.vue"

export default {
  name: "Projects",
  data() {
    return {
      projectsData: projects
    };
  },
  components: {
    ProjectItem
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
  .project-container {
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