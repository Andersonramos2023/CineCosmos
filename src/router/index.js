import {createRouter, createWebHistory } from 'vue-router'
import InicioTodos from '@/views/Todos/InicioTodos.vue';
import HomeFiccaoViws from '@/views/Ficção/HomeFiccaoViws.vue';
import HomeFantasia from '@/views/Fantasia/HomeFantasia.vue';

const routes =
[



//////////////////////////////

   /*     TODOS        */

//////////////////////////////
{
  path:'/tv/:tvId',
  name:'tvDetails',
  component: () => import('@/views/Todos/TvDetailsView.vue'), props: true,
},
{
  path: '/tv',
  name:'TV',
  component: () => import('../views/Todos/TvViews.vue')
},
{

path: '/',
name: 'IncioTodos',
component: InicioTodos
},


//////////////////////////////

   /*     FICÇÃO        */

//////////////////////////////
  {
    path:'/tv/:tvId',
    name:'tvDetailsFiccao',
    component: () => import('@/views/Ficção/Ficcaoviews/TvDetailsFiccaoView.vue'), props: true,
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

//////////////////////////////

   /*     FANTASIA        */

//////////////////////////////

 {
    path:'/tv/:tvId',
    name:'tvDetailsFantasia',
    component: () => import('@/views/Fantasia/Fantasiaviews/TvDetailsFantasiaView.vue'), props: true,
  },
{
path: '/inicioFantasia',
name: 'IncioFantasia',
component: () => import('../views/Fantasia/Fantasiaviews/InicioFantasia.vue')
},
{
path: '/fantasia',
name: 'HomeFantasia',
component: HomeFantasia
},
{
path: '/tvFantasia',
name:'TVFantasia',
component: () => import('../views/Fantasia/Fantasiaviews/TvViewsFantasia.vue')
},

];

const router = createRouter({
  history: createWebHistory(), routes,
});

export default router;
