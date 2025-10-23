<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useGenreStore } from '@/stores/genre'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore()
const isLoading = ref(false)
const movies = ref([])

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    })
    movies.value = response.data.results
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    await genreStore.getAllGenres('movie')
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
  } finally {
    isLoading.value = false
  }
})

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}
</script>

<template>
  <div>
    <h1>Gêneros de filmes</h1>

    <ul class="genre-list">

      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }">

        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
          @click="openMovie(movie.id)" />

        <div class="movies-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
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

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.movie-card {
  width: 200px;
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #ccc;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-bottom: 2px solid #387250;
}

.movie-title {
  font-weight: bold;
  margin: 0.5rem 0;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
