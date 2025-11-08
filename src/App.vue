<script setup>
</script>

<template>
  <header class="headerCosmos">

  <router-link to="/"> <h1>Cine<span>Cosmos</span></h1></router-link>

    <!-- Menu principal com router-link -->
    <ul>
      <li>
        <router-link to="/" class="icon-link">
          <ion-icon name="home-outline"></ion-icon>
        </router-link>
      </li>
      <li>
        <div class="icon-link">
          <ion-icon name="albums-outline"></ion-icon>
        </div>
      </li>
      <li>
        <router-link to="/tv" class="icon-link">
          <ion-icon name="tv-outline"></ion-icon>
        </router-link>
      </li>
    </ul>

    <!-- Campo de pesquisa -->
    <div class="pesquisa">
      <button @click="buscar">
        <span class="lupa">
          <ion-icon name="search-outline"></ion-icon>
        </span>
      </button>
      <input type="text" placeholder="Buscar filme..." />
    </div>
  </header>

  <div class="linhaFundo"></div>

  <main>
    <router-view />
  </main>
</template>

<style scoped>

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

.linhaFundo {
  position: fixed;
  top: -75vw;
  left: 35vw;
  width: 50vw;
  height: 350vh;
  z-index: -1;
  transform: rotate(50deg);
  background-color: #00ff44;
  opacity: 0.6;
  mask-image: linear-gradient(
    to right,
    transparent 1%,
    black 50%,
    black 50%,
    transparent 85%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 5%,
    black 50%,
    black 50%,
    transparent 85%
  );
  animation: brilhoConstante 5s ease-in-out infinite;
  filter: blur(10px);
}

@keyframes brilhoConstante {
  0% {
    opacity: 0.6;
    filter: blur(8px);
  }
  50% {
    opacity: 0.9;
    filter: blur(12px);
  }
  100% {
    opacity: 0.6;
    filter: blur(8px);
  }
}
</style>
