let playerSymbol = ''; // 用於存儲玩家選擇的符號

function chooseSymbol(symbol) {
  playerSymbol = symbol; // 更新玩家選擇的符號
}

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      return gameBoard[a];
    }
  }
  if (!gameBoard.includes("")) {
    gameActive = false;
    return "draw";
  }
  return null;
}

function handleClick(index) {
  if (!gameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  const cell = document.getElementsByClassName("cell")[index];

  const img = new Image();
  img.src = currentPlayer === "X" ? "/X.png" : "/O.png";
  img.width = "100";
  cell.appendChild(img);

  const winner = checkWinner();
  if (winner) {
    if (winner !== "draw") {
      const winningCells = winConditions.find((combo) => {
        const [a, b, c] = combo;
        return (
          gameBoard[a] === winner &&
          gameBoard[b] === winner &&
          gameBoard[c] === winner
        );
      });
      displayWinningCells(winningCells);
      currentPlayer === "X" ? playerXWins++ : playerOWins++;
      updateScoreboard();
    }
    const message = winner === "draw" ? "平局！" : `玩家 ${winner} 獲勝！`;
    document.querySelector(".message").innerText = message;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  document.querySelector(".message").innerText = "";
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
}

// ...之前的程式碼

let playerXWins = 0;
let playerOWins = 0;

function updateScoreboard() {
  document.getElementById("playerXWins").innerText = playerXWins;
  document.getElementById("playerOWins").innerText = playerOWins;
}

function displayWinningCells(cells) {
  cells.forEach((cellIndex) => {
    document.getElementsByClassName("cell")[cellIndex].classList.add("win");
  });
}

// function handleClick(index) {
//   if (!gameActive || gameBoard[index] !== "") return;

//   gameBoard[index] = currentPlayer;
//   document.getElementsByClassName("cell")[index].innerText = currentPlayer;

//   const winner = checkWinner();
//   if (winner) {
//     if (winner !== "draw") {
//       const winningCells = winConditions.find((combo) => {
//         const [a, b, c] = combo;
//         return (
//           gameBoard[a] === winner &&
//           gameBoard[b] === winner &&
//           gameBoard[c] === winner
//         );
//       });
//       displayWinningCells(winningCells);
//       currentPlayer === "X" ? playerXWins++ : playerOWins++;
//       updateScoreboard();
//     }
//     const message =
//       winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`;
//     document.querySelector(".message").innerText = message;
//   } else {
//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//   }
// }
