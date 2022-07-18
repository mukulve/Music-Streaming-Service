<script setup>
import { useStore } from "../stores/store.js";
</script>
<script>
export default {
  data() {
    return {
      cover_xl: [],
      title: [],
      preview: [],
      showhint: true,
    };
  },
  methods: {
    search() {
      if (this.searchfield == "") {
        this.showhint = true;
      } else {
        this.showhint = false;
      }

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key":
            "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
        },
      };

      fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.searchfield,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.cover_xl = [];
          this.title = [];
          this.preview = [];
          for (let i = 0; i <= 23; i++) {
            var { preview } = response.data[i];
            var { title_short } = response.data[i];
            var { cover_xl } = response.data[i].album;

            if (title_short.length > 10)
              title_short = title_short.substring(0, 10) + "...";

            this.cover_xl.push(cover_xl);
            this.title.push(title_short);
            this.preview.push(preview);
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        });
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
  mounted() {},
};
</script>

<template>
  <div class="search">
    <button><i class="fa-solid fa-magnifying-glass"></i></button>
    <input
      type="text"
      placeholder="Search..."
      v-model="searchfield"
      @input="search"
      @change="search"
      @mousedown="search"
    />
  </div>
  <main>
    <div class="hint" v-if="showhint">
      <h1>Search for tracks, artists, podcasts, and playlists.</h1>
    </div>
    <div class="results">
      <div class="result" v-for="(item, index) in cover_xl" :key="item.id">
        <div class="result_img">
          <img :src="cover_xl[index]" :alt="title[index]" />
          <button
            @click="play_audio"
            :id="preview[index] + title[index] + cover_xl[index]"
          >
            <i
              :id="preview[index] + title[index] + cover_xl[index]"
              class="fa-solid fa-circle-play"
            ></i>
          </button>
        </div>
        <h2>{{ title[index] }}</h2>
        <!--<audio :id="preview[index]">
          <source :src="preview[index]" />
        </audio>-->
      </div>
    </div>
    <div class="madeby">
      <h4>Made By Mukul</h4>
    </div>
  </main>
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

.hint {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 220px);
}

.search {
  display: flex;
  height: 50px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: var(--marginleft);
  border-bottom: var(--border);
}

.search button,
.search input {
  height: 100%;
  font-size: 1.3rem;
  border: none;
  background-color: var(--bg);
}

.search input {
  width: 100%;
}

.results {
  display: grid;
  grid-template-columns: var(--gridtemplate);
}

.results img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.result {
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
