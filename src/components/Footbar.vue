<script setup>
import { useStore } from "../stores/store.js";
import { storeToRefs } from "pinia";
</script>
<script>
//detect change to the pinia store

const store = useStore();
const { title } = storeToRefs(store);
const { img } = storeToRefs(store);
console.log(title);

function play_audio() {
  var audioelm = document.getElementById("audio");

  if (audioelm.paused) {
    audioelm.play();
  } else {
    audioelm.pause();
  }
}
</script>

<template>
  <footer>
    <div class="song_info">
      <img :src="store.img" />
      <h1>{{ store.title }}</h1>
    </div>
    <div class="song_controls">
      <button @click="play_audio()">
        <h1>
          <i class="fa-solid fa-play"></i> / <i class="fa-solid fa-pause"></i>
        </h1>
      </button>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100vw;
  border-top: var(--border);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 2;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  justify-content: space-between;
  align-content: center;
}

.song_info img {
  height: 75px;
  border-radius: 10px;
}

.song_info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.song_controls button {
  background-color: transparent;
  border: none;
}

@media screen and (max-width: 750px) {
  footer {
    position: fixed;
    bottom: 50px;
    height: 50px;
  }

  .song_info img {
    display: none;
  }
}
</style>
