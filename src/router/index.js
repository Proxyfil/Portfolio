import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Path from '../pages/Path.vue'
import Projects from '../pages/Projects.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/parcours",
        name: "Path",
        component: Path
      },
      {
        path: "/projets",
        name: "Projects",
        component: Projects
      }
    ]
  });
  
  export default router;