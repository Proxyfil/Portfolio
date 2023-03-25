<template>
  <div>
    <div id="container" class="flex justify-center items-center">
      <div>
        <h1 class="text-3xl max-sm:flex max-sm:justify-center">Salut ! 👋</h1>
        <div class="max-sm:flex max-sm:justify-center"><h1 class="sm:text-6xl my-2 text-4xl">Je suis <span class="highlight font-semibold">Proxyfil</span></h1></div>
        <div class="sm:text-2xl max-sm:flex max-sm:justify-center text-xl flex-wrap w-full text-center"><h1 class="">Développeur passionné et enthousiaste.</h1></div>
        <div class="max-sm:flex max-sm:justify-center">
          <div class="mt-4 button py-2 px-4 rounded w-max max-sm:flex max-sm:justify-center" v-on:click="this.scrollFunction()">
            <a class="text-lg w-max">En savoir plus</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center short-pres py-24" id="short-pres">
      <div class="sm:w-3/5 w-5/6">
        <h1 class="highlight sm:text-3xl mb-4 font-semibold text-2xl">Petite présentation</h1>
        <h1 class="sm:text-xl text-lg">Je m'appelle <span class="highlight">Pierre-Louis Leclerc</span>, jeune développeur et j'ai 18 ans (déjà).<br> J'adore coder des projets, construire des applications ou créer des algorithmes pour résoudre divers problèmes.</h1>
        <h1 class="sm:text-xl mt-3 text-lg">Je suis principalement axé sur la <span class="highlight">création d'outils web ou d'analyse d'Open-Data</span>.<br>Je suis passionné par les analyses de données des réseaux sociaux ou des groupements de communautés.<br />J'ai appris majoritairement en auto-didacte et je suis aujourd'hui étudiant en <span class="highlight">1ère année d'école d'ingénieur</span> dans la ville de Tours.</h1>
      </div>
    </div>
    <div class="flex justify-center short-path md:py-24 py-4">
      <div class="py-4 sm:w-3/5 w-5/6">
        <h1 class="highlight text-3xl mb-4 font-semibold">Résumé de parcours</h1>
        <div id="path-container" class="border-l-2 pl-5">
          <PathItem v-for="path in Path" v-bind:key="path" v-bind:date="path.date" v-bind:titre="path.titre" v-bind:desc="path.desc" v-bind:status="path.status"/>
        </div>
        <!--<div class="mt-4 button py-2 px-4 rounded w-max">
          <a href="" class="text-lg">Plus sur mon parcours</a>
        </div>-->
      </div>
    </div>
    <div class="flex justify-center short-comp md:py-24 py-4">
      <div class="py-4 sm:w-3/5 w-max">
        <h1 class="highlight text-3xl mb-4 font-semibold max-sm:ml-4">Résumé des compétences</h1>
        <div id="comp-container" class="flex flex-wrap justify-evenly">
          <CompItem v-for="comp in Comps" v-bind:key="comp" v-bind:nom="comp.nom" v-bind:icon="comp.icon" v-bind:valeur="comp.valeur"/>
        </div>
      </div>
    </div>
    <div class="flex justify-center short-projects md:py-24 py-4">
      <div class="py-4 md:w-3/5 w-5/6">
        <h1 class="highlight text-3xl mb-4 font-semibold">Mes projets</h1>
        <div id="project-container" class="flex flex-wrap justify-center">
          <ProjectItem v-for="project in Projects" v-bind:key="project" v-bind:date="project.date" v-bind:titre="project.titre" v-bind:desc="project.desc" v-bind:techs="project.techs" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center contact md:py-24 py-4">
      <div class="md:flex flex-wrap justify-center">
        <a href="mailto:leclerc.pierrelouis@gmail.com" target="blank" class="flex text-sm mr-6 my-2"><img src="/Home/mail.svg" class="w-6 mr-1" />leclerc.pierrelouis@gmail.com</a>
        <a href="https://www.linkedin.com/in/pierre-louis-leclerc-6235b4238/" target="blank" class="flex text-sm mr-6 my-2"><img src="/Home/linkedin.svg" class="w-6 mr-1" />Pierre-Louis Leclerc</a>
        <a href="https://github.com/Proxyfil" target="blank" class="flex text-sm mr-6 my-2"><img src="/Home/github.svg" class="w-6 mr-1" />Proxyfil</a>
        <a href="https://twitter.com/Proxyfil_" target="blank" class="flex text-sm my-2"><img src="/Home/twitter.svg" class="w-6 mr-1" />@Proxyfil_</a>
      </div>
    </div>
  </div>
</template>

<script>
import PathItem from "@/components/Home/PathItem.vue";
import CompItem from "@/components/Home/CompItem.vue";
import ProjectItem from "@/components/Home/ProjectItem.vue";
import path from "./data/Home/path.json";
import comps from "./data/Home/comps.json";
import projects from "./data/Home/projects.json";

export default {
  name: "Home",
  data() {
    return {
      Path: path,
      Comps: comps,
      Projects: projects
    }
  },
  components: {
    PathItem,
    CompItem,
    ProjectItem
  },
  methods:{
    scrollFunction: function() {
      let e = document.getElementById("short-pres");
      e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'end'
      });
    }
  }
}
</script>

<style>
#container {
  min-height: 75vh;
  margin-bottom: 20vh;
}

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

.short-pres {
  min-height: 50vh;
}

.short-path {
  min-height: 70vh;
}

.short-comp {
  min-height: 50vh;
}

.short-projects {
  min-height: 50vh;
}

#path-container {
  border-color: var(--text-primary);
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