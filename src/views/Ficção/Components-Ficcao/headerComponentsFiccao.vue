<script setup>

import { ref } from 'vue';

const trocaDeGenero = ref(false)

</script>

<template>
  <header class="headerCosmos">

  <router-link to="/inicioFiccao"> <h1>Cine<span>Cosmos</span></h1></router-link>

    <ul>
      <li>
        <router-link to="/inicioFiccao" class="icon-link">
          <ion-icon name="home-outline"></ion-icon>
        </router-link>
      </li>
      <li>
        <div class="icon-link-troca"  @click="trocaDeGenero = !trocaDeGenero">
          <ion-icon name="albums-outline"></ion-icon>
        </div>
      </li>

        <div class="generosFilmes" v-if="trocaDeGenero">
          <ul>
            <li><router-link to="/">Todos</router-link></li>
            <li><router-link to="/ficcao">Ficção Científica</router-link></li>
            <li><router-link to="/fantasia">Fantasia</router-link></li>
          </ul>
        </div>
         <li>
        <router-link to="/tvficcao" class="icon-link">
          <ion-icon name="tv-outline"></ion-icon>
        </router-link>
      </li>
    </ul>

    <div class="pesquisa">
      <button @click="buscar">
        <span class="lupa">
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </button>
      <input type="text" placeholder="Buscar filme..." />
    </div>
  </header>


</template>

<style scoped>
.generosFilmes {
  position: absolute;
  display: inline-flex; /* importante: impede que o flex ocupe o espaço total */
  flex-direction: column;
  align-items: flex-start; /* alinha o texto à esquerda */
  gap: 2px;
  top: 5.8vw;
  left: 40vw;
  background-color: #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px #00ff4433;
  z-index: 10;
  padding: 10px 10px; /* deixa o texto respirar */
  animation: aparecer 0.25s linear;
}


.generosFilmes ul {
  list-style: none;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.generosFilmes li {
margin: 2px 0px;
padding: 4px 8px;
line-height: 1.1px;
}

.generosFilmes a {

  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.headerCosmos a{
  text-decoration: none;
}
.headerCosmos {
  width: 45vw;
  height: 60px;
  background-color: transparent;
  border: solid 1px #fff;
  margin: 35px auto;
  margin-left: 28vw;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.headerCosmos h1 {
  font-size: 25px;
  color: white;
  padding: 0 2rem 0 0;
}

.headerCosmos h1 span {
  color: #00ff44;
  font-size: 0.6em;
}

.headerCosmos ul {
  list-style: none;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.headerCosmos li {
  display: flex;
  align-items: center;
}

.icon-link {
  color: #00ff44;
  font-size: 22px;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: ease-out 0.1s;
}

.icon-link:hover {
  transform: scale(1.5);
  color: #fff;
  border-bottom: solid 1.5px #00ff44;
}


.icon-link-troca {
  color: #00ff44;
  font-size: 22px;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: ease-out 0.1s;
}

.icon-link-troca:hover {
  transform: scale(1.5);
  color: #fff;
  border-bottom: solid 1.5px #00ff44;
}

.pesquisa input {
  padding: 0 20px;
  background-color: transparent;
  border-bottom: solid 1px #fff;
  color: #fff;
  font-size: 15px;
}

.pesquisa button {
  border-bottom: 1px solid #fff;
  background-color: transparent;
  color: #fff;
}

.lupa {
  font-size: 15px;
  color: #fff;
}

input {
  outline: none;
  border: none;
}

button {
  border: none;
  margin-left: 20px;
  margin-top: 0px;
}

@keyframes aparecer{
  0%{
    transform: scale(0.2);
  }
  50%{
    transform: scale(0.5);
  }
  100%{
    transform: scale(1);
  }
}
</style>
