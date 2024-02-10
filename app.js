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
  g.grid = document.querySelector(".grid"); // game board
  g.pacman = document.querySelector(".pacman"); // pacman parent element object
  g.eye = document.querySelector(".eye"); // pacman child eye element to change pacman direction
  g.mouth = document.querySelector(".mouth"); // pacman child mouth element to change pacman direction
  g.ghost = document.querySelector(".ghost"); // ghost parent element object template
  g.ghost.style.display = "none"; // hide ghost element.
  console.log(g);
});
