<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useTvStore } from '@/stores/Tv';
  import HomeViws from './HomeViws.vue';
  const tvStore = useTvStore();

  const props = defineProps({
    tvId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await tvStore.getTvDetail(props.tvId);
  });
</script>

<template>
  <HomeViws>
      <div class="main">
    <div class="content">

        <img
        :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
        :alt="tvStore.currentTv.title"
        class="imagemI"
      />

      <div class="details">

        <h1>Série: {{ tvStore.currentTv.name }}</h1>
        <p>{{ tvStore.currentTv.tagline }}</p>
        <p>{{ tvStore.currentTv.overview }}</p>
        <p>Orçamento: ${{ tvStore.currentTv.budget }}</p>
        <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>
      </div>
    </div>
  </div>

  <p class="produtoras">Produtoras</p>
  <div class="companies">
    <template
      v-for="company in tvStore.currentTv.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />

      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  </HomeViws>

</template>

<style scoped>.produtoras{
font-size: 30px;
padding: 0 50px;
}
.main {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  background:transparent;
  box-shadow: 0 0 15px #1dfa00;
 transition: 1s ease-in-out;
 margin-bottom: 50px;
 margin-top: 50px;
}
.content img{
  border-radius: 20px;
}
.content:hover {
 transform: scale(1.1);

}
.imagemI {
  width: 280px;
  border-radius: 20px;
  box-shadow: 0 0 10px #838102;
  transform: scale(1);
}

.details {
  color: white;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.details h1 {

  font-size: 35px;
  margin: 0;
  color: #ffff;
}

.details p {
  opacity: 0.9;
  line-height: 1.4rem;
}

/* ----- PRODUTORAS ----- */

.companies {
  margin-top: 50px;
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding-bottom: 40px;
}

.companies img {
  height: 40px !important;
  filter: brightness(0) invert(2);
  opacity: 0.8;
  transition: 0.2s;
}

.companies img:hover {
  opacity: 1;

}
</style>
