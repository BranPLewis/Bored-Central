const URL = "http://localhost:8080/";

Vue.createApp({
  data() {
    return {
      hotbarOn: false,
    };
  },
  methods: {
    toggle_hotbar: function () {
      this.hotbarOn = !this.hotbarOn;
    },
    hotbarOff: function () {
      this.hotbarOn = false;
    },
  },
  created: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.hotbarOn = false;
      }
    });
  },
}).mount("#app");
