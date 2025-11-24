<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import HomeAventura from '@/views/Ficção/HomeAventuraViws.vue'

// ROTAS
const route = useRoute()
const router = useRouter()

// Estados
const results = ref([])
const query = ref(route.query.q || "")

// Seu token
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2RjNWUwYzU1YTNjMDJkMDQ2YmNkMTJlYWI3YTM0OSIsIm5iZiI6MTc1OTUxMjk5MC4yNiwic3ViIjoiNjhlMDA5OWVmZjlkOTllNGNlMTg5MTM4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LJTzN7Qih5GOupppGmYJyady3AnjQP42wcIA3XdL2pc"

// Função principal
const buscar = async () => {
  if (!query.value.trim()) {
    results.value = []
    return
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/tv",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        params: {
          query: query.value,
          language: "pt-BR",
        },
      }
    )

    results.value = response.data.results
  } catch (error) {
    console.error("Erro ao buscar:", error)
  }
}

// Quando o parâmetro mudar → refaz a busca
watch(
  () => route.query.q,
  (novaBusca) => {
    query.value = novaBusca
    buscar()
  }
)

// Rodar ao abrir a tela
buscar()


function openTv(Id){
  router.push({ name:'tvDetailsAventura',
  params:{tvId: Id}})
}
</script>

<template>

 <HomeAventura>
  <div class="buscar-container">

    <h2>Resultados da busca por: <span>"{{ query }}"</span></h2>

    <div v-if="results.length > 0" class="resultado-lista">
      <div
        class="resultado-item"
        v-for="x in results"
        :key="x.id"
        @click="openTv(x.id)"
      >

        <img
          :src="`https://image.tmdb.org/t/p/w500${x.poster_path}`"
          :alt="x.title"
        />

        <p>{{ x.title }}</p>
      </div>

    </div>

    <p v-else class="sem-resultados">Nenhum resultado encontrado...</p>

  </div>

  </HomeAventura>
</template>

<style scoped>


h2{
  margin-bottom: 20px;
}

.buscar-container {
  color: white;
  padding: 0 80px;
}


.resultado-lista p, img  {

  margin-left: 100px;
  margin-top: 20px;
  width: 100%;

}
.resultado-item img{
 border-bottom: 2px solid #880d0d; /* antes: #C81D1D */
}
.resultado-lista {
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #e70606; /* antes: #7F0E0E */
  transition: transform 0.3s;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.resultado-item {
  width: 250px;
  cursor: pointer;
  text-align: center;
}

.resultado-item img {
  width: 100%;

  border-radius: 10px;
  transition: 0.2s;
}

.resultado-item img:hover {
  transform: scale(1.05);
}

.sem-resultados {
  margin-top: 20px;
  opacity: 0.7;
}
</style>
