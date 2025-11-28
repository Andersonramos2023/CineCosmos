<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import { useRouter } from "vue-router";
import HomeAventuraViws from "../HomeAventuraViws.vue";

const router = useRouter();

function openTv(tvId) {
  router.push({
    name: "tvDetailsAventura",
    params: { tvId }
  });
}

const isLoading = ref(false);

// LISTAS
const aventuraTv = ref([]);
const crimeTv = ref([]);
const dramaTv = ref([]);

// 🔥 Terror (27)
const loadAventuraTv = async () => {
  const response = await api.get("discover/tv", {
    params: {
      with_genres: 9648,
      language: "pt-BR",
    },
  });
  aventuraTv.value = response.data.results;
};

// 🔫 Crime (80)
const loadCrimeTv = async () => {
  const response = await api.get("discover/tv", {
    params: {
      with_genres: 10768,
      language: "pt-BR",
    },
  });
  crimeTv.value = response.data.results;
};

const loadDramaTv = async () => {
  const response = await api.get("discover/tv", {
    params: {
      with_genres: 10751,
      language: "pt-BR",
    },
  });
  dramaTv.value = response.data.results;
};

// 🔄 CARREGAR FILMES
onMounted(async () => {
  isLoading.value = true;

  await loadAventuraTv();
  await loadCrimeTv();
  await loadDramaTv();

  isLoading.value = false;
});

// 🔥 LOADER ANIMAÇÃO
onMounted(() => {
  const loader = document.querySelector(".loader");
  const texto = document.querySelector(".texto");

  texto.style.opacity = "0";

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 300);

    texto.style.opacity = "1";
  }, 1000);
});
</script>

<template>
  <HomeAventuraViws>

    <div class="texto">Cine<span>Cosmos</span></div>

    <div class="loader">
      <div class="dot dot1"></div>
      <div class="dot dot2"></div>
      <div class="dot dot3"></div>
    </div>

    <!-- 🔥 Exemplo de exibição dos filmes -->


    <h2>Mistérios!</h2>

    <div class="lista">
      <div v-for="tv in aventuraTv" :key="tv.id" class="card" >
        <img
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        @click="openTv( tv.id )"/>

      </div>
    </div>

    <h2>Colete equipado? Então bora ver esses filmes intensos!</h2>
    <div class="lista">
      <div v-for="tv in crimeTv" :key="tv.id" class="card">
        <img
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        @click="openTv( tv.id )"
        />
      </div>
    </div>

    <h2>Descanse e aproveite o tempo com a família.</h2>
    <div class="lista">
      <div v-for="tv in dramaTv" :key="tv.id" class="card">
        <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
                @click="openTv( tv.id )"
/>
      </div>
    </div>

  </HomeAventuraViws>
</template>

<style scoped>
h2 {
  margin-top: 50px;
  padding-left: 20px;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}

/* --------------------------- */
/* LISTA CARROSSEL */
.lista {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem;
  white-space: thin;
}

.lista::-webkit-scrollbar {
  height: 12px;
}

.lista::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.lista::-webkit-scrollbar-thumb {
  background: #723838;
  border-radius: 10px;
  border: 2px solid #1a1a1a;
}

.lista::-webkit-scrollbar-thumb:hover {
  background: #9e4e4e;
}

/* --------------------------- */
/* CARDS */
.card {
  flex: 0 0 auto;
  width: 230px;
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #dd1717;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  border-bottom: 2px solid #743737;
  border-radius: 10px;
}

.texto {
  margin-top: 220px;
  margin-left: 36vw;
  color: white;
  font-size: 4vw;
  font-weight: bold;
  opacity: 0;
  transition: opacity .6s ease;
}

.loader {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
  transition: opacity .4s ease;
}

.dot {
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 50%;
  animation: pulse 1.2s infinite ease-in-out;
}

.dot1 { background-color: chartreuse; animation-delay: .1s; }
.dot2 { background-color: red;        animation-delay: .3s; }
.dot3 { background-color: aqua;       animation-delay: .5s; }

@keyframes pulse {
  0% { transform: scale(0.4); opacity: .3; }
  40% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.4); opacity: .3; }
}
</style>
