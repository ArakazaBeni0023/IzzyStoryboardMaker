import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateStoryboard.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/CreateStoryboard.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../views/StoryboardView.vue')
  },
  {
    path: '/storyboard',
    name: 'storyboard',
    redirect: '/view'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router