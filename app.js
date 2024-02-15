const board = ["pink", "blue", "limegreen", "red", "orchid", "orange"];

const myBoard = [];

const tempBoard = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2,
  2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 1, 1, 2,
  1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1,
  2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
  size: 30,
  ghosts: 6,
  inplay: false,
  startGhost: 11
};

const player = {
  pos: 32,
  speed: 4,
  cool: 0,
  pause: false,
  score: 0,
  lives: 5,
  gameover: true,
  gamewin: false,
  powerup: false,
  powerCount: 0
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
  g.pacman.style.display = "none"; // hide pacman element until game starts.

  // //console.log(g);
});

gameStarter = (e) => {
  myBoard.length = 0; // clear myBoard array
  ghosts.length = 0; // clear ghosts array
  //console.log("Start Game!"); // //console log start game
  g.grid.innerHTML = ""; // clear game board grid
  g.x = ""; // clear grid x value
  if (!player.gamewin) {
    player.score = 0,
    player.lives = 5
  } else {
    player.gamewin = false;
  }
  player.gameover = false;
  createGame(); // create game board
  updateScore(); // update score
  g.grid.focus(); // focus on game board
  g.grid.style.display = "grid"; // show game board
  startGame.style.display = "none"; // hide start game button once clicked.
  g.pacman.style.display = "block"; // show pacman element once game starts.
};

boardBuilder = () => {
  console.log(tempBoard);
  tempBoard.length = 0;
  let boxSize =
    document.documentElement.clientHeight < document.documentElement.clientWidth
      ? document.documentElement.clientHeight
      : document.documentElement.clientWidth;
  console.log(boxSize);
  g.h = boxSize / g.size - boxSize / (g.size * 5);
  console.log(g.h);
  let tog = false;
  for (let x = 0; x < g.size; x++) {
    let wallz = 0;
    for (let y = 0; y < g.size; y++) {
      let val = 2;
      wallz--;
      if (wallz > 0 && (x - 1) % 2) {
        val = 1;
      } else {
        wallz = Math.floor(Math.random() * (g.size / 2));
      }
      if (x == 1 || x == g.size - 3 || y == 1 || y == g.size - 2) {
        val = 2; //place dot
      }
      if (x == g.size - 2) {
        if (!tog) {
          g.startGhost = tempBoard.length;
          tog = true;
        }
        val = 4;
      }
      if (y == 3 || y == g.size - 4) {
        if (x == 1 || x == g.size - 3) {
          val = 3;
        }
      }
      if (x == 0 || x == g.size - 1 || y == 0 || y == g.size - 1) {
        val = 1;
      }
      tempBoard.push(val);
    }
  }
  gameStarter();
}

// startGame.addEventListener("click", gameStarter); // start game button event listener

startGame.addEventListener("click", boardBuilder); // start game button event listener

document.addEventListener("keydown", (e) => {
  //console.log(e.code); // //console log key presses
  if (e.code in keyz) {
    keyz[e.code] = true;
  }

  if (!g.inplay && !player.pause) {
    player.play = requestAnimationFrame(move);
    g.inplay = true;
  }

});

document.addEventListener("keyup", (e) => {
  //console.log(e.code); // //console log key presses
  if (e.code in keyz) {
    keyz[e.code] = false;
  }
});

createGhost = () => {
  let newGhost = g.ghost.cloneNode(true);
  newGhost.pos = g.startGhost;
  newGhost.style.display = "block";
  newGhost.counter = 0;
  newGhost.defaultColor = board[ghosts.length];
  newGhost.dx = Math.floor(Math.random() * 4);
  newGhost.style.backgroundColor = board[ghosts.length];
  newGhost.style.opacity = "0.8";
  newGhost.namer = board[ghosts.length] + "y";
  ghosts.push(newGhost);
  //console.log(newGhost);
}

findDir = (a) => {
  let val = [a.pos % g.size, Math.ceil(a.pos/g.size)]; // find position in grid format (x, y)
  return val; // return position col, row
}

changeDir = (enemy) => {

  let gg = findDir(enemy); // find ghost position in grid format (x, y)
  let pp = findDir(player); // find pacman position in grid format (x, y)

  // //console.log(gg);
  // //console.log(pp);

  let ran = Math.floor(Math.random() * 2); // random number 0 or 1

  if (ran < 2) {
    enemy.dx = (gg[0] < pp[0]) ? 2 : 3;
  } // horizontal direction change based on ghost position and pacman position (left or right)
  else {
    enemy.dx = (gg[1] < pp[1]) ? 1 : 0;
  } // vertical direction change based on ghost position and pacman position (up or down)

  // change ghost counter value to random number + 2 so it goes at least 2 spaces before changing direction
  enemy.counter = (Math.random() * 1) + 2;
}

move = () => {

  if (g.inplay) {

    player.cool--; // decrement player cooldown slowdown value
    if (player.cool < 0) {
      // //console.log(ghosts);
      //placement and movement of ghosts
      let tempPower = 0;
      if (player.powerup) {
        player.powerCount--; // decrement powerup count
        if (player.powerCount % 2) {
          g.pacman.style.backgroundColor = "red"; // change pacman color to red
        } else {
          g.pacman.style.backgroundColor = "orangered"; // change pacman color to red
        }
        if (player.powerCount <= 20) {
          g.pacman.style.backgroundColor = "orange"; // change pacman color to orange
        if (player.powerCount % 2) {
          g.pacman.style.backgroundColor = "white"; // change pacman color to white
        }
      }
        if (player.powerCount <= 0) {
          player.powerup = false; // set powerup to false
          g.pacman.style.backgroundColor = "yellow"; // change pacman color back to yellow
          console.log("Lost power!"); // //console log lost power
          tempPower = 1;
        }
      }


      ghosts.forEach((ghost) => {
        if (tempPower == 1) {
          ghost.style.backgroundColor = ghost.defaultColor; // change ghost color back to original
        } else if (player.powerCount > 0) {
          if (player.powerCount % 2) {
            ghost.style.backgroundColor = "white"; // change ghost color to white
          } else {
            ghost.style.backgroundColor = "teal"; // change ghost color to teal
          }
        }
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

        if (ghost.stopped > 0) {
          ghost.stopped--; // decrement ghost stop count
          ghost.pos = startPosPlayer(g.startGhost); // set ghost position back to previous, current position
        }

        if (player.pos == ghost.pos) {
          // add ghost collision detection with pacman position by comparing ghost position to pacman position
          //console.log("Ghost got you " + ghost.namer); // //console log ghost got you
          if (player.powerCount > 0) {
            //YOU ate the ghost
            player.score += 100; // increment player score by 100
            ghost.stopped = 100;
            ghost.pos = g.startGhost; // set ghost position back to start
          } else {
            player.lives--; // decrement player lives
            gameReset(); // reset game
          }
          updateScore(); // update lives
        }

        let valGhost = myBoard[ghost.pos]; // future ghost position
        if (valGhost.t == 1) {
          // //console.log("Ghost Wall!"); // //console log wall
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

      if (newPlace.t == 1 || newPlace.t == 4) {
        //console.log("wall!"); // //console log wall
        player.pos = tempPos; // set player position back to previous, current position
      }

      //powerup
      if (newPlace.t == 3) {
        player.powerCount = 100; // set powerup count to 100
        player.powerup = true; // set powerup to true
        console.log("powerup!"); // //console log powerup
        myBoard[player.pos].innerHTML = ""; // remove power pellet from cell
        player.score += 10; // increment player score by 10
        updateScore(); // update score
        newPlace.t = 0; // power pellet is gone, set cell type value to 0
      }

      if (newPlace.t == 2) {
        //console.log("dot!"); // //console log dot
        // dots left
        myBoard[player.pos].innerHTML = ""; // remove dot from cell
        let tempDots = document.querySelectorAll(".dot");
        console.log(tempDots.length); // //console log dot length
        if (tempDots.length == 0) {
          playerWins(); // player wins
        }
        player.score++; // increment player score
        updateScore(); // update score
        newPlace.t = 0; // dot is gone, set cell type value to 0
      }

      //console.log(player.pos, tempPos); // //console log future player position and current player position

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

      //console.log(newPlace.t); // //console log future player position type value
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
    //console.log(cell);
    createSquare(cell);
  });

  for (let index = 0; index < g.size; index++) {
    g.x += `${g.h}px `; // cell grid height
  }
  g.grid.style.gridTemplateColumns = g.x;
  g.grid.style.gridTemplateRows = g.x;

  startPos();
};

playerWins = () => {
  player.gamewin = true;
  g.inplay = false;
  player.pause = true;
  startGame.style.display = "block";
}

endGame = () => {
  player.gamewin = false;
  startGame.style.display = "block";
};




gameReset = () => {
  //console.log("Paused!");
  window.cancelAnimationFrame(player.play);
  g.inplay = false;
  player.pause = true;
  if (player.lives < 0) {
    player.gameover = true;
    endGame();
  }
  if (!player.gameover) {
  setTimeout(startPos, 3000);
}
};

startPos = () => {
  player.pause = false;
  let firstStartPos = 20;
  player.pos = startPosPlayer(firstStartPos);
  myBoard[player.pos].append(g.pacman);
  ghosts.forEach((ghost, index) => {
    let temp = g.startGhost;
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
    //console.log("GAME OVER, MAN!");
    player.gameover = true;
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

    if (val === 4) {
      div.classList.add("hideout");
      if (g.startGhost == 11) {
        g.startGhost = myBoard.length;
      }
    } // add hideout to cell

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
      //console.dir(div);
    })
};
