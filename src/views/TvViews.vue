<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useGenreStore } from '@/stores/genre'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'

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
        with_genres: genreId,
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
  router.push({ name: 'tvDetails', params: { tvId } })
}
</script>

<template>
  <div>
    <h1>Gêneros de filmes</h1>

    <ul class="genre-list">

      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listtv(genre.id)" class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }">

        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-list">
      <div v-for="tv in tv" :key="tv.id" class="tv-card">

        <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title"
          @click="openTv(tv.id)" />

        <div class="tv-details">
          <p class="tv-title">{{ tv.title }}</p>
          <p class="tv-release-date">{{ formatDate(tv.release_date) }}</p>
          <p class="tv-genres">
            <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listtv(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }">
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #000;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.tv-card {
  width: 200px;
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #ccc;
  transition: transform 0.3s;
}

.tv-card:hover {
  transform: scale(1.05);
}

.tv-card img {
  width: 100%;
  border-bottom: 2px solid #387250;
}

.tv-title {
  font-weight: bold;
  margin: 0.5rem 0;
}

.tv-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
