import {createRouter, createWebHistory } from 'vue-router'
import InicioTodos from '@/views/Todos/InicioTodos.vue';
import HomeAventuraViws from '@/views/Ficção/HomeAventuraViws.vue';
import HomeFantasia from '@/views/Fantasia/HomeFantasia.vue';


const routes =
[



//////////////////////////////

   /*     TODOS        */

//////////////////////////////
{
  path:'/todos/tv/:tvId',
  name:'tvDetailsTodos',
  component: () => import('@/views/Todos/TvDetailsView.vue'), props: true,
},

{
path: '/pesquisaTodos',
name:'resultadoTodos',
component: () => import("../views/Todos/resultadoPesquisaTodos.vue")
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

   /*     Aventura        */

//////////////////////////////
  {
    path:'/aventura/tv/:tvId',
    name:'tvDetailsAventura',
    component: () => import('@/views/Ficção/Aventuraviews/TvDetailsAventuraView.vue'), props: true,
  },

{
path: '/pesquisaAventura',
name:'resultadoAventura',
component: () => import('../views/Ficção/Aventuraviews/resultadoPesquisaAventura.vue')
},

{
path: '/inicioAventura',
name: 'IncioAventura',
component: () => import('../views/Ficção/Aventuraviews/InicioAventura.vue')
},
{
path: '/Aventura',
name: 'HomeAventura',
component: HomeAventuraViws
},
{
path: '/tvAventura',
name:'TVAventura',
component: () => import('../views/Ficção/Aventuraviews/TvViewsAventura.vue')
},

//////////////////////////////

   /*     FANTASIA        */

//////////////////////////////

 {
    path:'/fantasia/tv/:tvId',
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

{
path: '/pesquisa',
name:'resultado',
component: () => import('../views/Fantasia/Fantasiaviews/resultadoPesquisaFantasia.vue')
},

];

const router = createRouter({
  history: createWebHistory(), routes,
});

export default router;
