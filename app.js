const board = ["pink", "blue", "limegreen", "red", "orchid", "orange"];

const myBoard = [];

const tempBoard = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 3, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 3, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 3, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 3, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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
  ghosts: 2,
  inplay: false,
};

const player = {
  pos: 32,
  speed: 4,
  cool: 0,
  pause: false,
  score: 0,
  lives: 5
};

const startGame = document.querySelector(".btn"); // start game button

document.addEventListener("DOMContentLoaded", () => {
  g.grid = document.querySelector(".grid"); // game board
  g.grid.style.display = "none"; // hide game board until game starts.
  g.pacman = document.querySelector(".pacman"); // pacman parent element object
  g.eye = document.querySelector(".eye"); // pacman child eye element to change pacman direction
  g.mouth = document.querySelector(".mouth"); // pacman child mouth element to change pacman direction
  g.ghost = document.querySelector(".ghost"); // ghost parent element object template
  g.score = document.querySelector(".score"); // score element
  g.lives = document.querySelector(".lives"); // lives element
  g.ghost.style.display = "none"; // hide ghost element until game starts.
  createGame(); // create game board
  updateScore(); // update score
  // console.log(g);
});

document.addEventListener("keydown", (e) => {
  console.log(e.code); // console log key presses
  if (e.code in keyz) {
    keyz[e.code] = true;
  }

  if (!g.inplay && !player.pause) {
    player.play = requestAnimationFrame(move);
    g.inplay = true;
  }

});

document.addEventListener("keyup", (e) => {
  console.log(e.code); // console log key presses
  if (e.code in keyz) {
    keyz[e.code] = false;
  }
})

startGame.addEventListener("click", (e) => {
console.log("Start Game!"); // console log start game
g.grid.style.display = "grid"; // show game board
startGame.style.display = "none"; // hide start game button once clicked.
});

createGhost = () => {
  let newGhost = g.ghost.cloneNode(true);
  newGhost.pos = 11 + ghosts.length;
  newGhost.style.display = "block";
  newGhost.counter = 0;
  newGhost.dx = Math.floor(Math.random() * 4);
  newGhost.style.backgroundColor = board[ghosts.length];
  newGhost.style.opacity = "0.8";
  newGhost.namer = board[ghosts.length] + "y";
  ghosts.push(newGhost);
  console.log(newGhost);
}

findDir = (a) => {
  let val = [a.pos % g.size, Math.ceil(a.pos/g.size)]; // find position in grid format (x, y)
  return val; // return position col, row
}

changeDir = (enemy) => {

  let gg = findDir(enemy); // find ghost position in grid format (x, y)
  let pp = findDir(player); // find pacman position in grid format (x, y)

  // console.log(gg);
  // console.log(pp);

  let ran = Math.floor(Math.random() * 2); // random number 0 or 1

  if (ran == 0) {
    enemy.dx = (gg[0] < pp[0]) ? 2 : 3;
  } // horizontal direction change based on ghost position and pacman position (left or right)
  else {
    enemy.dx = (gg[1] < pp[1]) ? 0 : 1;
  } // vertical direction change based on ghost position and pacman position (up or down)

  // change ghost counter value to random number + 2 so it goes at least 2 spaces before changing direction
  enemy.counter = Math.random() * 10 + 2;
}

move = () => {

  if (g.inplay) {

    player.cool--; // decrement player cooldown slowdown value
    if (player.cool < 0) {
      // console.log(ghosts);
      //placement and movement of ghosts
      ghosts.forEach((ghost) => {
        myBoard[ghost.pos].append(ghost); // append ghost to cell
        ghost.counter--; // decrement ghost counter
        let oldPos = ghost.pos; // original ghost position
        if (ghost.counter <= 0) {
          // check if ghost counter is less than or equal to 0
          changeDir(ghost); // change ghost direction
        } else {
          //if the ghost isn't changing direction, then it's changing position.
          if (ghost.dx == 0) {
            ghost.pos -= g.size; // move ghost right
          } else if (ghost.dx == 1) {
            ghost.pos += g.size; // move ghost left
          } else if (ghost.dx == 2) {
            ghost.pos += 1; // move ghost down
          } else if (ghost.dx == 3) {
            ghost.pos -= 1; // move ghost up
          }
        }

        if (player.pos == ghost.pos) {
          // add ghost collision detection with pacman position by comparing ghost position to pacman position
          console.log("Ghost got you " + ghost.namer); // console log ghost got you
          player.lives--; // decrement player lives
          updateScore(); // update lives
          gameReset(); // reset game
        }

        let valGhost = myBoard[ghost.pos]; // future ghost position
        if (valGhost.t == 1) {
          // console.log("Ghost Wall!"); // console log wall
          ghost.pos = oldPos; // set ghost position back to previous, current position
          changeDir(ghost); // change ghost direction
        }

        myBoard[ghost.pos].append(ghost); // append ghost to cell
      });


      //Keyboard events to move pacman

      let tempPos = player.pos; // current player position

      if (keyz.ArrowRight) {
        player.pos += 1;
        g.eye.style.left = "20%"; // change pacman eye direction to right
        g.mouth.style.left = "60%"; // change pacman mouth direction to right
      } else if (keyz.ArrowLeft) {
        player.pos -= 1;
        g.eye.style.left = "60%"; // change pacman eye direction to left
        g.mouth.style.left = "0%"; // change pacman mouth direction to left
      } else if (keyz.ArrowUp) {
        player.pos -= g.size;
      } else if (keyz.ArrowDown) {
        player.pos += g.size;
      }

      let newPlace = myBoard[player.pos]; // future player position pacman is moving toward.

      if (newPlace.t == 1) {
        console.log("wall!"); // console log wall
        player.pos = tempPos; // set player position back to previous, current position
      }

      if (newPlace.t == 2) {
        console.log("dot!"); // console log dot
        myBoard[player.pos].innerHTML = ""; // remove dot from cell
        player.score++; // increment player score
        updateScore(); // update score
        newPlace.t = 0; // dot is gone, set cell type value to 0
      }

      console.log(player.pos, tempPos); // console log future player position and current player position

      if (player.pos != tempPos) { // check if pacman moved
        // Open and close pacman mouth toggle function
        if (player.tog) {
          g.mouth.style.height = "30%";
          player.tog = false;
        } else {
          g.mouth.style.height = "10%";
          player.tog = true;
        }
      }

      player.cool = player.speed; // set cooloff

      console.log(newPlace.t); // console log future player position type value
    }

    if (!player.pause) {

    myBoard[player.pos].append(g.pacman); // append pacman to cell
    player.play = requestAnimationFrame(move); // request animation frame
  }

}

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

  startPos();
};

gameReset = () => {
  console.log("Paused!");
  window.cancelAnimationFrame(player.play);
  g.inplay = false;
  player.pause = true;
  setTimeout(startPos, 3000);
};

startPos = () => {
  player.pause = false;
  let firstStartPos = 20;
  player.pos = startPosPlayer(firstStartPos);
  myBoard[player.pos].append(g.pacman);
  ghosts.forEach((ghost, index) => {
    let temp = (g.size + 1) + index;
    ghost.pos = startPosPlayer(temp);
    myBoard[ghost.pos].append(ghost);
  })
};

startPosPlayer = (val) => {
if (myBoard[val].t != 1) {
  return val;
}
return startPosPlayer(val + 1);
}

updateScore = () => {
  if (player.lives < 0) {
    console.log("GAME OVER, MAN!");
    g.lives.innerHTML = "GAME OVER!"
  } else {
  g.score.innerHTML = `Score: ${player.score}`;
  g.lives.innerHTML = `Lives: ${player.lives}`;
}
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
