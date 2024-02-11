const board = ["pink", "blue", "limegreen", "red", "orchid", "orange"];

const myBoard = [];

const tempBoard = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 3, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const keyz = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false
};


const ghosts = [];

const g = {
  x: "",
  y: "",
  h: 100,
  size: 10,
  ghosts: 6,
  inplay: false,
};

const player = {
  pos: 32,
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
  g.ghost.style.display = "none"; // hide ghost element until game starts.
  g.pacman.style.display = "none"; // hide pacman element until game starts.
  createGame(); // create game board
  console.log(g);
});

document.addEventListener("keydown", (e) => {
  console.log(e.code); // console log key presses
  if (e.code in keyz) {
    keyz[e.code] = true;
  }
  player.play = requestAnimationFrame(move);
});

document.addEventListener("keyup", (e) => {
  console.log(e.code); // console log key presses
  if (e.code in keyz) {
    keyz[e.code] = false;
  }
})

createGhost = () => {
  let newGhost = g.ghost.cloneNode(true);
  newGhost.pos = 11 + ghosts.length;
  newGhost.style.display = "block";
  newGhost.style.backgroundColor = board[ghosts.length];
  newGhost.namer = board[ghosts.length] + "y";
  ghosts.push(newGhost);
  console.log(newGhost);
}

move = () => {
  console.log(ghosts); // console log ghosts array of ghost objects
  ghosts.forEach((ghost) => {
    myBoard[ghost.pos].append(ghost); // append ghost to cell
  });

  if(keyz.ArrowRight){
    player.pos += 1;
  } else if(keyz.ArrowLeft){
    player.pos -= 1;
  } else if(keyz.ArrowUp){
    player.pos -= g.size;
  } else if(keyz.ArrowDown){
    player.pos += g.size;
  }

  console.log(player.pos); // console log player position

  g.pacman.style.display = "block"; // show pacman element
  myBoard[player.pos].append(g.pacman); // append pacman to cell
};

createGame = () => {
  for(let i=0; i<g.ghosts; i++){
    createGhost();
  }

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
  if (val == 1) {
    div.classList.add("wall");
  }
  if (val == 2) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    div.append(dot);
  } // add dot to cell
  if (val == 3) {
    const dot = document.createElement("div");
    dot.classList.add("power-pellet");
    div.append(dot);
  } // add power pellet to cell
  g.grid.append(div);
  myBoard.push(div);
  div.t = val; // set cell type value based on tempBoard array index value
  div.idVal = myBoard.length; // set cell id value based on myBoard array index
  div.addEventListener(
    "click", (e) => {
      console.dir(div);
    })
};
