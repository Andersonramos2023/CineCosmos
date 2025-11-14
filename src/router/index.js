import {createRouter, createWebHistory } from 'vue-router'
import HomeViws from '@/views/Todos/HomeViws.vue';
import HomeFiccaoViws from '@/views/Ficção/HomeFiccaoViws.vue';

const routes =
[
{
path: '/',
name: 'Home',
component: HomeViws
},
{
path: '/tv',
name:'TV',
component: () => import('../views/Todos/TvViews.vue')
},
{

path: '/inicioTodos',
name: 'IncioTodos',
component: () => import('../views/Todos/InicioTodos.vue')
},
{
path: '/inicioFiccao',
name: 'IncioFiccao',
component: () => import('../views/Ficção/Ficcaoviews/InicioFiccao.vue')
},
{
path: '/Ficcao',
name: 'HomeFiccao',
component: HomeFiccaoViws
},
{
path: '/tvficcao',
name:'TVFiccao',
component: () => import('../views/Ficção/Ficcaoviews/TvViewsFiccao.vue')
},
];

const router = createRouter({
  history: createWebHistory(), routes,
});

export default router;
