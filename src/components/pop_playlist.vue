<script setup>
import { useStore } from "../stores/store.js";
import { storeToRefs } from "pinia";
</script>
<script>
export default {
  data() {
    return {
      playlists: [
        "1996494362",
        "1677006641",
        "6682665064",
        "9130505782",
        "2018572642",
        "3155776842",
      ],
      picture_xl: [],
      title: [],
      preview: [],
    };
  },
  methods: {
    fetchplaylists() {
      var playlists = this.playlists;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key":
            "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
        },
      };

      for (let i = 0; i < playlists.length; i++) {
        fetch(
          "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + playlists[i],
          options
        )
          .then((response) => response.json())
          .then((response) => {
            var { picture_xl } = response;
            var { title } = response;
            var { preview } = response.tracks.data[0];

            if (title.length > 10) title = title.substring(0, 10) + "...";

            this.picture_xl.push(picture_xl);
            this.title.push(title);
            this.preview.push(preview);
          })
          .catch((err) => console.error(err));
      }
    },
    play_audio(e) {
      var audioelm = document.getElementById("audio");
      const source = event.target.id;

      var title = source.split(".mp3").pop().split("https://")[0];
      var img = source.split(".mp3").pop().split("https://")[1];
      var audio = source.substr(0, source.indexOf(title));

      var img = "https://" + img;

      const store = useStore();
      //console.log(store);
      store.setImg(img);
      store.setTitle(title);

      if (audioelm.paused) {
        audioelm.src = audio;
        audioelm.play();
      } else {
        audioelm.pause();
      }
    },
  },
  mounted() {
    this.fetchplaylists();
  },
};
</script>

<template>
  <h1>Popular Playlists</h1>
  <div class="popular_playlists">
    <div class="playlist" v-for="(item, index) in playlists">
      <div class="result_img">
        <img :src="picture_xl[index]" />
        <button
          @click="play_audio"
          :id="preview[index] + title[index] + picture_xl[index]"
        >
          <i
            :id="preview[index] + title[index] + picture_xl[index]"
            class="fa-solid fa-circle-play"
          ></i>
        </button>
      </div>
      <h2>{{ title[index] }}</h2>
    </div>
  </div>
  <audio id="audio">
    <source src="" />
  </audio>
</template>

<style scoped>
.result_img {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.result_img img {
  width: 100%;
  height: auto;
}

.result_img button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: transparent;
  color: #25e35f;
  font-size: 3rem;
  padding: 12px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  display: none;
}

.result_img:hover > button {
  display: block;
  cursor: pointer;
}

.result_img:hover > img {
  animation: 3s linear 0.1s colorIt;
  filter: brightness(70%);
  cursor: pointer;
}

.popular_playlists {
  display: grid;
  grid-template-columns: var(--gridtemplate);
}

.playlist img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.playlist {
  background-color: var(--grey);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
}
</style>
