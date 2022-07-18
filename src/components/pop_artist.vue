<script>
export default {
  data() {
    return {
      artists: [
        "246791",
        "58447102",
        "4962010",
        "4344192",
        "6853403",
        "11279454",
      ],
      picture_xl: [],
      name: [],
    };
  },
  methods: {
    fetchartist() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      var artists = this.artists;

      for (let i = 0; i < artists.length; i++) {
        fetch(
          "https://deezerdevs-deezer.p.rapidapi.com/artist/" + artists[i],
          options
        )
          .then((response) => response.json())
          .then((response) => {
            var { picture_xl } = response;
            var { name } = response;

            if (name.length > 10) name = name.substring(0, 10) + "...";

            this.picture_xl.push(picture_xl);
            this.name.push(name);
          })
          .catch((err) => console.error(err));
      }
    },
  },
  mounted() {
    this.fetchartist();
  },
};
</script>

<template>
  <h1>Popular Artists</h1>
  <div class="popular_artists">
    <div class="artist" v-for="(item, index) in name">
      <img :src="picture_xl[index]" />
      <h2>{{ name[index] }}</h2>
    </div>
  </div>
</template>

<style scoped>
.popular_artists {
  display: grid;
  grid-template-columns: var(--gridtemplate);
}

.artist img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.artist {
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
