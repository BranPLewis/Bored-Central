const URL = "http://localhost:8080/";

Vue.createApp({
  data() {
    return {
      showLogInDiv: false,
      showLogOutDiv: false,
      showHotbarDiv: false,

      results: [
        {
          name: "minesweeper",
          url: "singleplayer.html",
          img: "game_imgs/Minesweeper_game.png",
        },
        {
          name: "Tic-Tac-Toe",
          url: "singleplayer.html",
          img: "game_imgs/XO_game.png",
        },
        {
          name: "Wordle",
          url: "singleplayer.html",
          img: "game_imgs/wordle_game.png",
        },
        {
          name: "snake",
          url: "singleplayer.html",
          img: "game_imgs/snake_game.png",
        },
        {
          name: "chess",
          url: "singleplayer.html",
          img: "game_imgs/chess_game.png",
        },
        {
          name: "checkers",
          url: "singleplayer.html",
          img: "game_imgs/checkers_game.png",
        },
        {
          name: "battleship",
          url: "singleplayer.html",
          img: "game_imgs/battleship_game.png",
        },
        {
          name: "rock paper scissors",
          url: "singleplayer.html",
          img: "game_imgs/rps_game.png",
        },
        {
          name: "solitaire",
          url: "singleplayer.html",
          img: "game_imgs/sol_game.png",
        },
      ],

      filteredResults: [],

      newResult: {
        name: "",
      },

      search: "",
      // hover: false,

      // showWip1: false,

      hotbarOn: false,
      loghotbarOn: false,
      hotbarAOn: false,

      eye_closed: true,
      eye_open: false,
      eyev_closed: true,
      eyev_open: false,
      eyel_closed: true,
      eyel_open: false,

      type: "password",
      type2: "password",
      type3: "password",

      users: [],
      newSignIn: {
        index: -1,
        name: "",
        email: "",
        password: "",
      },
      newAccount: {
        index: -1,
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toggle_hotbar: function () {
      this.hotbarOn = !this.hotbarOn;
      this.loghotbarOn = false;
      this.hotbarAOn = false;
    },
    hotbarOff: function () {
      this.hotbarOn = false;
    },

    toggle_hotbarA: function () {
      this.hotbarAOn = !this.hotbarAOn;
      this.loghotbarOn = false;
      this.hotbarOn = false;
    },
    hotbarAOff: function () {
      this.hotbarAOn = false;
    },

    toggle_loghotbar: function () {
      this.loghotbarOn = !this.loghotbarOn;
      this.hotbarOn = false;
      this.hotbarAOn = false;
    },
    loghotbarOff: function () {
      this.loghotbarOn = false;
    },

    toggle_password() {
      this.eye_closed = !this.eye_closed;
      this.eye_open = !this.eye_open;
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    toggle_vpassword() {
      this.eyev_closed = !this.eyev_closed;
      this.eyev_open = !this.eyev_open;
      if (this.type2 === "password") {
        this.type2 = "text";
      } else {
        this.type2 = "password";
      }
    },
    toggle_lpassword() {
      this.eyel_closed = !this.eyel_closed;
      this.eyel_open = !this.eyel_open;
      if (this.type3 === "password") {
        this.type3 = "text";
      } else {
        this.type3 = "password";
      }
    },

    sign_In() {
      (this.showLogInDiv = false),
        (this.showLogOutDiv = true),
        (this.showHotbarDiv = true),
        (this.loghotbarOn = !this.loghotbarOn);
      this.hotbarOn = false;
      this.hotbarAOn = false;
    },
    sign_Out() {
      (this.showLogInDiv = true),
        (this.showLogOutDiv = false),
        (this.showHotbarDiv = false),
        window.location.reload();
    },

    // showWipDiv1: function() {
    //   this.showWip1 = !this.showWip1
    // }
  },
  created: function () {
    window.ondragstart = function () {
      return false;
    };

    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.hotbarOn = false;
      }
      if (e.key == "Escape") {
        this.loghotbarOn = false;
      }
      if (e.key == "Escape") {
        this.hotbarAOn = false;
      }
    });
  },

  watch: {
    search(newSearch, oldSearch) {
      this.filteredResults = this.results.filter((result) => {
        return result.name.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },
}).mount("#app");
