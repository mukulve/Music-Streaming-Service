import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      title: "",
      img: "",
    };
  },
  actions: {
    setTitle(title) {
      this.title = title;
    },
    setImg(img) {
      this.img = img;
    },
  },
});
