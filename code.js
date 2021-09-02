const mainElement = document.querySelector("main")
let playerElement = null

const playerDestination = { rowIndex: 0, cellIndex: 0 }
const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W   W",
  "W W W WWW WWWWW W WWW",
  "W W W  W      W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW"
];

// row loop
for (let rowIndex = 0; rowIndex < map.length; rowIndex += 1) {
  const rowMap = map[rowIndex]
  const rowElement = document.createElement("div")
  rowElement.classList.add("row")
  rowElement.dataset.rowIndex = rowIndex // https://mdn.io/using-data-attributes
  mainElement.append(rowElement)

  // column loop
  for (let cellIndex = 0; cellIndex < rowMap.length; cellIndex += 1) {
    const cellType = rowMap[cellIndex]
    const cellElement = document.createElement("div")
    cellElement.classList.add("cell")
    cellElement.dataset.cellIndex = cellIndex // https://mdn.io/using-data-attributes
    rowElement.append(cellElement)
    
    if (cellType === "W") {
      cellElement.classList.add("wall")
    } else if (cellType === " ") {
      cellElement.classList.add("floor")
    } else if (cellType === "S") {
      cellElement.classList.add("floor", "start")

      playerElement = document.createElement("div")
      playerElement.classList.add("player")
      cellElement.append(playerElement)

      // Set our model of the player destination to the starting position, which is our CURRENT indexes:
      playerDestination.rowIndex = rowIndex
      playerDestination.cellIndex = cellIndex
    } else if (cellType === "F") {
      cellElement.classList.add("floor", "finish")
    }

  }

}

function onKeypress (event) {
  const keyPressed = event.key

  if (keyPressed === "ArrowRight") {
    moveRight()
  } else if (keyPressed === "ArrowLeft") {
    moveLeft()
  } else if (keyPressed === "ArrowDown") {
    moveDown()
  } else if (keyPressed === "ArrowUp") {
    moveUp()
  }

  // Check for a win!
  const isFinish = playerElement.parentElement.classList.contains("finish")
  if (isFinish) {
    console.log("YOU WON!")
  }
}

function moveRight () {
  // First, update the playerDestination model according to the direction you want to move:
  playerDestination.cellIndex += 1
  // Then, update the playerElement itself (that is, MOVE it):
  movePlayerToDestinationPosition()
}

function moveLeft () {
  playerDestination.cellIndex -= 1
  movePlayerToDestinationPosition()
}

function moveDown () {
  playerDestination.rowIndex += 1
  movePlayerToDestinationPosition()
}

function moveUp () {
  playerDestination.rowIndex -= 1
  movePlayerToDestinationPosition()
}

function movePlayerToDestinationPosition () {
  const destinationRow = mainElement.childNodes[playerDestination.rowIndex]
  const destinationCell = destinationRow.childNodes[playerDestination.cellIndex]

  destinationCell.append(playerElement)
}

document.addEventListener("keydown", onKeypress)
