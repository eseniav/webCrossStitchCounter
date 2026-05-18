import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import GalleryView from '../views/GalleryView.vue';
import StatisticsView from '../views/StatisticsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/statistics', name: 'statistics', component: StatisticsView },
  { path: '/login', name: 'login', component: { template: '<div><h1>Страница входа</h1></div>' } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
