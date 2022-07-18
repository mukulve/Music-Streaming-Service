<script setup>
import pop_playlist from "./pop_playlist.vue";
import Pop_song from "./pop_song.vue";
import Pop_artist from "./pop_artist.vue";
</script>

<template>
  <main>
    <pop_playlist />
    <Pop_song />
    <Pop_artist />
    <div class="madeby">
      <h4>Made By Mukul</h4>
    </div>
  </main>
</template>

<style scoped>
.madeby {
  text-align: center;
}

main {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: var(--marginleft);
  margin-bottom: 80px;
}
</style>
