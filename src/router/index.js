import {createRouter, createWebHistory } from 'vue-router'
import HomeViws from '@/views/HomeViws.vue';

const routes =
[
{
path: '/',
name: 'Home',
component: HomeViws
},
{
path: '/Filmes',
name: 'Moves',
component: () => import('../views/MoviesView.vue')
},
{
path: '/tv',
name:'TV',
component: () => import('../views/TvViews.vue')
},
];

const router = createRouter({
  history: createWebHistory(), routes,
});

export default router;
