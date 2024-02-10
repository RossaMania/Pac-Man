const board = ["pink", "blue", "green", "red", "purple", "orange"];

const myBoard = [];

const tempBoard = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1,
  1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2,
  2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2,
  2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
];

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
  createGame(); // create game board
  console.log(g);
});

createGame = () => {
  tempBoard.forEach((cell) => {
    console.log(cell);
    createSquare(cell);
  });

  for (let index = 0; index < g.size; index++) {
    g.x += `${g.h}px `; // cell grid height
  }
  g.grid.style.gridTemplateColumns = g.x;
  g.grid.style.gridTemplateRows = g.x;
};

createSquare = (val) => {
  const div = document.createElement("div");
  div.classList.add("box");
};
