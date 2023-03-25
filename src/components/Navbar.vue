<template>
  <div id="nav-container" class="p-4 flex justify-around sticky top-0 z-20">
    <div id="nav-background" class="w-full h-full absolute top-0 left-0"></div>
    <div class="flex items-center">
      <router-link to="/parcours" class="p-1 mx-1 link">Parcours</router-link>
      <div id="main-icon" class="flex items-center p-1 w-max mx-3">
        <router-link to="/" class="flex items-center">
          <img src="/logo.svg" class="w-6 mr-2"/>
          <h1 class="text-xl font-semibold">Proxyfil</h1>
        </router-link>
      </div>
      <router-link to="/projets" class="p-1 mx-1 link">Projets</router-link>
      <!--<div id="nav-links">
        <router-link to="/path" class="p-1 mx-1 link">Parcours</router-link>
        <router-link to="/master" class="p-1  mx-1 link">Compétences</router-link>
        <router-link to="/projects" class="p-1  mx-1 link">Projets</router-link>
        <router-link to="/contact" class="p-1  mx-1 link">Contact</router-link>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
        
    }
  }
}
</script>

<style scoped>
#main-icon {
  color: #fff;
}

#nav-background {
  backdrop-filter: blur(12px);
  background-color: #0E0E1050;
}

#main-icon:hover {
  color: var(--text-primary);
  cursor: pointer;
}

#main-icon {
  transition: all 0.3s;
}

#main-icon img {
  transition: all 0.3s;
}

#main-icon:hover img {
  transform: rotate(-10deg);
}

#nav-container .link {
  transition: all 0.3s ease-in-out;
}

#nav-container .link:hover {
  color: var(--text-primary);
}
</style>