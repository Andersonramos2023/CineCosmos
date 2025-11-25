<script setup>
import { onMounted } from "vue";
import HomeTodosViws from "../Todos/HomeViws.vue";
onMounted(() => {
  const loader = document.querySelector(".loader");
  const texto = document.querySelector(".texto");

  // começa escondido
  texto.style.opacity = "0";

  // tempo do loader (1 segundo = 1000ms)
  setTimeout(() => {
    loader.style.opacity = "0";     // esmaece o loader
    loader.style.pointerEvents = "none";

    // remove depois da animação
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);

    // mostra o conteúdo
    texto.style.opacity = "1";
  }, 5000);
});
</script>

<template> <HomeTodosViws>

<div class="texto">Cine<span>Cosmos</span></div>

  <div class="loader">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>
  </HomeTodosViws>

</template>

<style scoped>
/* conteúdo começa invisível */
.texto {
  margin-top: 220px;
  margin-left: 36vw;
  color: white;
  font-size: 4vw;
  font-weight: bold;
  opacity: 0;
  transition: opacity .6s ease;
}

/* fundo do loader */
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

/* pontos */
.dot {
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 50%;
  animation: pulse 1.2s infinite ease-in-out;
}

.dot1 { background-color: chartreuse; animation-delay: .1s; }
.dot2 { background-color: red;        animation-delay: .3s; }
.dot3 { background-color: aqua;       animation-delay: .5s; }

/* animação crescer/diminuir */
@keyframes pulse {
  0% {
    transform: scale(0.4);
    opacity: 0.3;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.4);
    opacity: 0.3;
  }
}
</style>
