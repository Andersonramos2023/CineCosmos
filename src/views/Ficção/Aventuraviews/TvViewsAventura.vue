<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useGenreStore } from '@/stores/genre'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import HomeAventuraViws from '../HomeAventuraViws.vue'

const router = useRouter()
const genreStore = useGenreStore()
const isLoading = ref(false)
const tv = ref([])

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listtv = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true
  try {
    const response = await api.get('discover/tv', {
      params: {
        with_genres:` 10759,${genreId}`,
        language: 'pt-BR',
      },
    })
    tv.value = response.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    await genreStore.getAllGenres('tv')
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
  } finally {
    isLoading.value = false
  }
})

function openTv(tvId) {
  router.push({ name: 'tvDetailsAventura', params: { tvId } })
}

// controle manual do carrossel
const scrollContainer = ref(null)
const scroll = (direction) => {
  const container = scrollContainer.value
  if (!container) return
  const scrollAmount = 250
  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  })
}
</script>

<template>
  <HomeAventuraViws>
  <div>
    <h1>Gênero Filmes </h1>

    <div class="carousel-wrapper">
      <button class="scroll-btn left" @click="scroll('left')">‹</button>

      <ul class="genre-list" ref="scrollContainer">
        <li
          v-for="genre in genreStore.genres"
          :key="genre.id"
          @click="listtv(genre.id)"
          class="genre-item"
          :class="{ active: genre.id === genreStore.currentGenreId }"
        >
          {{ genre.name }}
        </li>
      </ul>

      <button class="scroll-btn right" @click="scroll('right')">›</button>
    </div>

    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-list">
      <div v-for="tv in tv" :key="tv.id" class="tv-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
          :alt="tv.title"
          @click="openTv(tv.id)"
        />
        <div class="tv-details">
          <p class="tv-title">{{ tv.title }}</p>
          <p class="tv-release-date">{{ formatDate(tv.release_date) }}</p>
          <p class="tv-genres">
            <span
              v-for="genre_id in tv.genre_ids"
              :key="genre_id"
              @click="listtv(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
            >
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  </HomeAventuraViws>
</template>

<style scoped>
h1{
  padding-left: 10%;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 2em auto;
}

.scroll-btn {
  background: #C81D1D; /* vermelho principal */
  color: #fff;
  border: none;
  font-size: 2rem;
  width: 60px;
  height: 70px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 1s;
  z-index: 2;
}

.scroll-btn:hover {
  background: #9E1717; 
}

.scroll-btn.left {
  margin-right: 10px;
}

.scroll-btn.right {
  margin-left: 10px;
}

.genre-list {
  overflow-x: auto;
  display: flex;
  gap: 1rem;
  list-style: none;
  scroll-behavior: smooth;
  padding: 0;
  margin: 0;
}

.genre-list::-webkit-scrollbar {
  display: none;
}

.genre-item {
  align-content: center;
  flex: 0 0 12em;
  text-align: center;
  background-color: #C81D1D; /* fundo vermelho */
  border-radius: 1rem;
  padding: 0.7rem;
  color: #fff;
  user-select: none;
  transition: 0.3s;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #9E1717; /* hover vermelho escuro */
  box-shadow: 0 0 0.5rem #7F0E0E; /* sombra vermelha */
}

.active {
  background-color: #F24D4D; /* vermelho claro para destaque */
  font-weight: bolder;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.tv-card {
  width: 210px;
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #7F0E0E; /* sombra vermelha */
  transition: transform 0.3s;
}

.tv-card:hover {
  transform: scale(1.05);
}

.tv-card img {
  width: 100%;
  border-bottom: 2px solid #C81D1D; /* linha vermelha */
}

.tv-title {
  font-weight: bold;
  margin: 0.5rem 0;
}

.tv-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

.tv-genres span {
  background-color: #9E1717;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #7F0E0E;
  box-shadow: 0 0 0.5rem #9E1717;
}

.tv-genres span.active {
  background-color: #F24D4D; /* destaque vermelho claro */
  color: #000;
  font-weight: bolder;
}

</style>
