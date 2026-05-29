import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import GalleryView from '../views/GalleryView.vue';
import StatisticsView from '../views/StatisticsView.vue';
import ProjectMenuView from '../views/ProjectMenuView.vue';
import ProjectView from '../views/ProjectView.vue'
import CommentsView from '../views/CommentsView.vue';
import PhotoProgressView from '../views/PhotoProgressView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/statistics', name: 'statistics', component: StatisticsView },
  { path: '/login', name: 'login', component: { template: '<div><h1>Страница входа</h1></div>' } },
  {
    path: '/project/:projectId',
    name: 'project',
    component: ProjectMenuView,
    redirect: {
      name: 'project-main'
    },
    children: [
      {
        path: '',
        name: 'project-main',
        component: ProjectView
      },
      {
        path: 'comments',
        name: 'project-comments',
        component: CommentsView
      },
      {
        path: 'photo-progress',
        name: 'project-photo-progress',
        component: PhotoProgressView
      },
      {
        path: 'profile',
        name: 'project-profile',
        component: ProfileView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
