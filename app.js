const board = ["pink", "blue", "green", "red", "purple", "orange"];

const myBoard = [];

const ghosts = [];

const g = {
  x: "",
  y: "",
  h: 100,
  size: 25,
  ghosts: 6,
  inplay: false,
};

const player = {
  pos: 20,
  speed: 4,
  cool: 0,
  pause: false,
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Shall we play a game?");
});
